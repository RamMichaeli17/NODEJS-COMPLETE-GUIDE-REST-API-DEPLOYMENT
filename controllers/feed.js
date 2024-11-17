require('dotenv').config(); // Load environment variables

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { validationResult } = require("express-validator");
const FormData = require('form-data'); // Added to handle multipart form data

const io = require("../socket");
const Post = require("../models/post");
const User = require("../models/user");

const IMAGEBB_API_KEY = process.env.IMAGEBB_API_KEY;

// Function to upload image to ImageBB
const uploadImageToImageBB = async (imagePath) => {
  try {
    console.log("Reading image from path:", imagePath);

    // Create a FormData instance to upload the image as multipart/form-data
    const form = new FormData();
    form.append('image', fs.createReadStream(imagePath)); 
    // Post the form to the ImageBB API
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,
      form,
      { headers: form.getHeaders() } // Set headers to multipart form data
    );

    // Check for successful response
    if (response.data && response.data.data && response.data.data.url) {
      return response.data.data.url;
    } else {
      throw new Error("ImageBB API did not return a valid URL.");
    }
  } catch (error) {
    console.error("Error uploading image to ImageBB:", error.message);
    if (error.response) {
      console.error("ImageBB API Response:", error.response.data);
    }
    throw new Error("Error uploading image to ImageBB");
  }
};

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;

  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate("creator")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetched posts successfully.",
      posts: posts,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }

  try {
    const imageUrl = await uploadImageToImageBB(req.file.path);
    const title = req.body.title;
    const content = req.body.content;

    const post = new Post({
      title,
      content,
      imageUrl,
      creator: req.userId,
    });

    await post.save();
    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();

    io.getIO().emit("posts", {
      action: "create",
      post: { ...post._doc, creator: { _id: req.userId, name: user.name } },
    });

    res.status(201).json({
      message: "Post created successfully!",
      post,
      creator: { _id: user._id, name: user.name },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId).populate("creator");
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Post fetched.", post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;

  if (req.file) {
    imageUrl = await uploadImageToImageBB(req.file.path);
  }

  if (!imageUrl) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }

  try {
    const post = await Post.findById(postId).populate("creator");
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    if (post.creator._id.toString() !== req.userId) {
      const error = new Error("Not authorized.");
      error.statusCode = 403;
      throw error;
    }

    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;

    const result = await post.save();
    io.getIO().emit("posts", { action: "update", post: result });
    res.status(200).json({ message: "Post updated!", post: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized.");
      error.statusCode = 403;
      throw error;
    }

    await Post.findByIdAndDelete(postId);
    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();

    io.getIO().emit("posts", { action: "delete", post: postId });
    res.status(200).json({ message: "Deleted post." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
