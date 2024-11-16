require('dotenv').config();  // Load environment variables

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { validationResult } = require("express-validator");

const io = require("../socket");
const Post = require("../models/post");
const User = require("../models/user");

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID; 

// Function to upload image to Imgur
const uploadImageToImgur = async (imagePath) => {
  try {
    console.log("Reading image from path:", imagePath);  // Log image path
    const image = fs.readFileSync(imagePath, { encoding: 'base64' });  // Read the file as base64
    console.log("Image read successfully.");

    // Uploading to Imgur
    const response = await axios.post('https://api.imgur.com/3/upload', {
      image: image,  // Send the base64 image directly
      type: 'base64'  // Specify that the image is base64 encoded
    }, {
      headers: {
        'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
        'Content-Type': 'application/json',  // Change content type to json
      },
    });

    console.log("Imgur Response:", response.data);  // Log the full response from Imgur

    if (response.data && response.data.data && response.data.data.link) {
      console.log("Image uploaded successfully. URL:", response.data.data.link);
      return response.data.data.link;  // Return the Imgur image URL
    } else {
      throw new Error("Imgur API did not return a valid link.");
    }
  } catch (error) {
    console.error("Error uploading image to Imgur:", error.message);
    if (error.response) {
      console.error("Imgur API Response:", error.response.data);  // Log detailed response if available
    }
    throw new Error("Error uploading image to Imgur");
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
  // .countDocuments()
  // .then((count) => {
  //   totalItems = count;
  //   return Post.find()
  //     .skip((currentPage - 1) * perPage)
  //     .limit(perPage);
  // })
  // .then((posts) => {
  //   res.status(200).json({
  //     message: "Fetched posts successfully.",
  //     posts: posts,
  //     totalItems: totalItems,
  //   });
  // })
  // .catch((err) => {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // });
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

  // Log the file path before attempting to upload
  console.log("Uploading image from file path:", req.file.path);

  try {
    // Upload image to Imgur
    const imageUrl = await uploadImageToImgur(req.file.path);  // Use the upload function
    const title = req.body.title;
    const content = req.body.content;

    const post = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl,  // Save the Imgur URL
      creator: req.userId,
    });

    await post.save();
    const user = await User.findById(req.userId);
    user.posts.push(post);
    const savedUser = await user.save();
    io.getIO().emit("posts", {
      action: "create",
      post: { ...post._doc, creator: { _id: req.userId, name: user.name } },
    });
    res.status(201).json({
      message: "Post created successfully!",
      post: post,
      creator: { _id: user._id, name: user.name },
    });
    return savedUser;
  } catch (err) {
    console.error("Error creating post:", err.message);  // Log any error that occurs
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  try {
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Post fetched.", post: post });
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

  try {
    const post = await Post.findById(postId).populate("creator");
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.creator._id.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    if (req.file) {
      // Upload new image to Imgur
      imageUrl = await uploadImageToImgur(req.file.path);
      // Delete old image if it exists and is different
      if (post.imageUrl && post.imageUrl !== imageUrl) {
        clearImage(post.imageUrl);
      }
    }

    if (!imageUrl) {
      const error = new Error("No file picked.");
      error.statusCode = 422;
      throw error;
    }

    post.title = title;
    post.imageUrl = imageUrl;
    post.content = content;
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
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }
    // Check logged in user
    clearImage(post.imageUrl);
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

const clearImage = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.log(err);
  });
};
