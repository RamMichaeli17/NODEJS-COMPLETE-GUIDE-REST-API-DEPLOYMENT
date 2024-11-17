<div id="top"></div>

<!-- PROJECT SHIELDS -->
[![GitHub repo size][reposize-shield]](#)
[![GitHub language count][languagescount-shield]](#)
[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Gmail][gmail-shield]][gmail-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT">
    <img src="https://github.com/user-attachments/assets/5d83b603-c97d-45e5-83c5-2425f7206db2" alt="Logo" width="240" height="240">
  </a>
  <h3 align="center">Node.js REST API Social Network/Blog Application</h3>
  <p align="center">
This project is a full-featured social network and blog application built with <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong>. It serves as the backend for a full-stack application, providing core functionalities such as user authentication, data storage, and CRUD operations. Users can sign up, create posts, and view other posts, making it an engaging platform for social interaction and content sharing. The project also includes features like pagination, file uploads, and integration with REST APIs and GraphQL (an option), making it a comprehensive example of a <strong>Node.js</strong> application in a real-world context.
    <br />
    <br />
    Visit the deployed backend application: 
    <a href="https://nodejs-complete-guide-rest-api-deployment.onrender.com">Backend Deployment</a>
    <br />
    Visit the deployed frontend application: 
    <a href="https://nodejs-complete-guide-rest-api-frontend.onrender.com/">Frontend Deployment</a>
    <br />
    <strong>Note:</strong> Due to free tier limitations, expect delays on first load due to app sleep mode.
    <br /><br />
    <strong>Note:</strong> This project is derived from the Udemy course 
    <a href="https://www.udemy.com/course/nodejs-the-complete-guide/">NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)</a> by Maximilian Schwarzmüller.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#key-components-and-features">Key Components and Features</a></li>
    <li><a href="#learning-objectives">Learning Objectives</a></li>
    <li><a href="#build-requirements">Build Requirements</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![image](https://github.com/user-attachments/assets/0032eb23-0989-4a6b-aa4a-870b3fcd6007)


This Node.js REST API Blog project simulates a functional social network and blog application where users can sign up and create posts. It covers the essential features of web development, including:

- **User Authentication**: Secure user login and registration.
- **CRUD Operations**: Create, read, update, and delete blog posts.
- **Data Persistence**: Store data in a MongoDB database, using Mongoose for schema-based modeling.
- **Error Handling**: Proper error responses for different scenarios.
- **Pagination**: Efficiently handle large amounts of data by paginating blog post listings.
- **File Uploads**: Allow users to upload images for their blog posts.
- **GraphQL Integration**: Query and mutate blog data using GraphQL for more flexible APIs.


## Technologies Used
This project employs a wide range of technologies and libraries to ensure a robust, efficient backend for the blog platform.

### Core Technologies
- **Node.js**: Backend runtime to handle HTTP requests and data processing.
- **Express.js**: Web framework to set up routes and middleware.
- **MongoDB**: NoSQL database for storing user and resource data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT**: For implementing secure authentication using JSON Web Tokens.
- **Bcrypt.js**: For hashing passwords.
- **dotenv**: For managing environment variables.
- **Render**: For deploying the application.

### Dependencies
- **axios**: Promise-based HTTP client for making requests to APIs.
- **body-parser**: Middleware for parsing incoming request bodies in a middleware before your handlers, available under the `req.body` property.
- **compression**: Middleware to compress response bodies for all requests.
- **express-validator**: Middleware to validate and sanitize user inputs.
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens (JWT).
- **multer**: Middleware for handling `multipart/form-data`, used for uploading files.
- **socket.io**: Library for enabling real-time, bidirectional communication between web clients and servers.

### DevDependencies
- **chai**: Assertion library for Node.js and browser that can be paired with any testing framework.
- **mocha**: Test framework running on Node.js and in the browser to run asynchronous tests.
- **nodemon**: Utility that monitors for any changes in your source and automatically restarts your server.
- **sinon**: Library for creating spies, stubs, and mocks for JavaScript testing.


<p align="right">(<a href="#top">back to top</a>)</p>

## Key Components and Features

### User Authentication
- **JWT Authentication**: Secure user login with JSON Web Tokens.
- **Signup and Login**: Users can register and log in securely.
- **Access Control**: Restricts certain actions to authenticated users only.
- **Password Hashing**: Passwords are stored securely using Bcrypt.js.

### CRUD Operations
- **Create Resource**: Create new records in the database (e.g., users, blog posts).
- **Read Resource**: Retrieve stored data using GET requests.
- **Update Resource**: Modify existing data with PUT/PATCH requests.
- **Delete Resource**: Remove data from the database using DELETE requests.

### Data Persistence with MongoDB
- **MongoDB**: Stores user and resource data in a MongoDB database.
- **Mongoose**: Handles database operations and data validation.

### Error Handling
- **Error Responses**: Provides proper error responses for different scenarios.

### Pagination
- **Efficient Data Handling**: Implements pagination for blog post listings to handle large amounts of data efficiently.

### File Uploads
- **REST API File Upload**: Allows users to upload images for their blog posts via REST API.
- **GraphQL File Upload**: Enables file uploads using GraphQL for more flexible APIs.
- **ImageBB Integration**: Utilizes ImageBB for hosting and managing uploaded images.

### GraphQL Integration
- **Flexible APIs**: Allows querying and mutating blog data using GraphQL.
- **Authentication in GraphQL APIs**: Secure GraphQL endpoints using JWT for user authentication.

### Real-Time Features with Websockets
- **Websockets Integration**: Enables real-time updates and communication between clients and the server.

### Automated Testing
- **Unit Tests**: Implements unit tests using Mocha, Chai, and Sinon to ensure code reliability and correctness.

<p align="right">(<a href="#top">back to top</a>)</p>

## Learning Objectives
By completing this project, you will:

- **Set up a Secure REST API**: Implement user authentication using JSON Web Tokens (JWT) to secure API endpoints.
- **Implement CRUD Operations**: Create, read, update, and delete resources such as users and blog posts within a Node.js application.
- **Work with MongoDB and Mongoose**: Utilize MongoDB for data storage and Mongoose for schema-based modeling and data validation.
- **Manage Environment Variables**: Use dotenv to handle environment variables securely.
- **Enable File Uploads**: Implement file upload functionality using Multer and manage uploaded images with ImageBB.
- **Integrate GraphQL**: Set up a GraphQL server, define schemas and resolvers, and perform queries and mutations for flexible API interactions.
- **Handle Errors Gracefully**: Implement robust error handling to provide meaningful error messages and responses.
- **Implement Pagination**: Efficiently manage and display large data sets by implementing pagination.
- **Use Real-Time Features with Websockets**: Enable real-time updates and communication between clients and the server using Socket.io.
- **Perform Automated Testing**: Write and run unit tests using Mocha, Chai, and Sinon to ensure code reliability and correctness.
- **Deploy a Node.js Application**: Learn how to deploy your Node.js application using Render, ensuring it's accessible and running in a production environment.


<p align="right">(<a href="#top">back to top</a>)</p>

## Build Requirements
- **Node.js** (v14.x or later)
- **MongoDB**: Local or Atlas instance.

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started
### Installation
1. Clone the repository
```sh
git clone https://github.com/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT.git
```
2. Install NPM packages
```sh
npm install
```
3. Set up environment variables - Create a `.env` file and add your credentials:
```env
MONGO_DEFAULT_DATABASE=your_mongo_default_database
MONGO_PASSWORD=your_mongo_password
MONGO_USER=your_mongo_user
NODE_ENV=your_node_env
PORT=your_port
JWT_SECRET=your_jwt_secret
```

For the frontend project, create a `.env` file and include the following:
```env
REACT_APP_API_BASE_URL=http://your-api-base-url.com
```

4. Start the server
```sh
npm start
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage
This project allows users to interact with a fully functional blog platform. Here's what users can do:

- **Register and Login**: Users can sign up for a new account and log in to access personalized features.
- **Create Blog Posts**: Authenticated users can create new blog posts, adding titles, content, and images.
- **Edit and Delete Blog Posts**: Users can edit or delete their own posts, ensuring they have full control over their content.
- **View Blog Posts**: All users (authenticated or not) can view blog posts. The blog posts are paginated to handle large amounts of data efficiently.
- **Comment on Posts**: Authenticated users can add comments to blog posts, engage in discussions, and delete their own comments if necessary.
- **Search Posts**: Users can search for specific blog posts by keywords, making it easier to find content.
- **GraphQL API**: Developers can query and mutate blog data using the GraphQL API provided by the server.

### Project Structure and Key Features
Here's a breakdown of the steps involved in building the blog project:

### Setting Up the Project
1. **Project Initialization**: Set up the Node.js project, install necessary dependencies (Express.js, MongoDB, etc.).
2. **Directory Structure**: Organize folders and files for better project management.

### User Authentication
1. **User Model**: Create a User schema using Mongoose for MongoDB.
2. **Registration and Login**: Implement routes and controllers for user signup and login.
3. **Authentication Middleware**: Ensure certain routes are accessible only to authenticated users.

### Blog Posts
1. **Post Model**: Create a schema for blog posts.
2. **CRUD Operations**: Implement routes and controllers for Creating, Reading, Updating, and Deleting blog posts.
3. **User Associations**: Link blog posts to users so they can only edit or delete their own posts.

### Comments
1. **Comment Model**: Create a schema for comments.
2. **Comment Routes**: Implement functionality for users to add, view, and delete comments on blog posts.

### GraphQL Integration
1. **GraphQL Setup**: Set up a GraphQL server using Apollo Server.
2. **Schemas and Resolvers**: Define GraphQL schemas and resolvers for querying and mutating blog data.
3. **Testing GraphQL Queries**: Use tools like GraphiQL to test your GraphQL API.

### Additional Features
1. **File Uploads**: Add functionality for users to upload images (e.g., for blog post thumbnails).
2. **Pagination**: Implement pagination for blog post listings to handle large amounts of data.
3. **Search Functionality**: Add a search feature to find blog posts by keywords.

### Deployment
1. **Environment Setup**: Set up environment variables for production.
2. **Deploying**: Deploy your application to a cloud service (e.g., Heroku, AWS).

<p align="right">(<a href="#top">back to top</a>)</p>

## License
Distributed under the MIT License. See [`LICENSE.txt`](https://github.com/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT/blob/main/LICENSE.txt) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributors
Thanks to the following people who have contributed to this project:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/RamMichaeli17">
        <img src="https://avatars.githubusercontent.com/u/62435713?v=4" width="100px;" /><br>
        <sub>
          <b>Ram Michaeli</b>
        </sub>
      </a>
    </td>
    <!-- Add more contributors here -->
  </tr>
</table>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact
Ram Michaeli - [ram153486@gmail.com](mailto:ram153486@gmail.com)

Project Link: [https://github.com/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT](https://github.com/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT)

<a href="mailto:ram153486@gmail.com"><img src="https://img.shields.io/twitter/url?label=Gmail%3A%20ram153486%40gmail.com&logo=gmail&style=social&url=https%3A%2F%2Fmailto%3Aram153486%40gmail.com"/></a>
<a href="https://linkedin.com/in/ram-michaeli"><img src="https://img.shields.io/twitter/url?label=ram%20Michaeli&logo=linkedin&style=social&url=https%3A%2F%2Fmailto%3Aram153486%40gmail.com"/></a>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[reposize-shield]: https://img.shields.io/github/repo-size/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT?style=for-the-badge
[languagescount-shield]: https://img.shields.io/github/languages/count/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT.svg?style=for-the-badge
[contributors-url]: https://github.com/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT.svg?style=for-the-badge
[stars-url]: https://github.com/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT/stargazers
[license-shield]: https://img.shields.io/github/license/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT.svg?style=for-the-badge
[license-url]: https://github.com/RamMichaeli17/NODEJS-COMPLETE-GUIDE-REST-API-DEPLOYMENT/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://linkedin.com/in/ram-michaeli
[gmail-shield]: https://img.shields.io/badge/ram153486@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white
[gmail-url]: mailto:ram153486@gmail.com
