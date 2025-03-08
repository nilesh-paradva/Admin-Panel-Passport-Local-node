# Blog Post Panel Project

## Overview
The **Blog Post Panel** is a platform where users can register and log in to create, read, edit, and delete their blog posts. The platform allows users to post their own content, as well as view blogs posted by other users. Each user can manage their own blogs, while others' blogs are only viewable (no modification options). This project aims to showcase the integration of user authentication, blog management, and file upload functionalities using a combination of tools and technologies.

## Project Stack
- **Frontend (UI)**: EJS (Embedded JavaScript)
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js (for user registration and login)
- **File Uploads**: Multer (for blog image uploads)

## Features

### User Authentication
- **Register**: Users can create a new account to access the platform.
- **Login**: Users can log in to their account using Passport.js authentication.
- **Session Management**: The platform uses cookies/sessions to keep users logged in across page reloads.

### Blog Management
- **Add Blog**: Users can create a new blog post by providing a title, content, and an image (which is uploaded using Multer).
- **Edit Blog**: Users can edit the blogs they have created.
- **Delete Blog**: Users can delete their own blogs.

### View Blogs
- **All Blogs Page**: A public page that displays all blogs created by users. Blogs are view-only here (no edit or delete options).
- **My Blogs Page**: A page that allows logged-in users to view, edit, and delete only their own blog posts.

## Key Routes & Logic

### User Authentication Routes:
- **POST /register**: Creates a new user.
- **POST /login**: Authenticates a user with Passport.js.
- **GET /logout**: Logs out the current user.

### Blog Routes:
- **GET /blogs**: Displays all blogs posted by all users (view-only).
- **GET /my-blogs**: Displays a list of blogs created by the logged-in user (with edit/delete options).
- **POST /blogs/add**: Allows the user to add a new blog post, including an image upload.
- **POST /blogs/edit/:id**: Allows the user to edit an existing blog post (only if they are the author).
- **DELETE /blogs/delete/:id**: Allows the user to delete an existing blog post (only if they are the author).

## Installation & Setup

1. **Clone the Repository** :
   ```bash
   https://github.com/nilesh-paradva/Admin-panel-passport-local-node.git

2. **Navigate into the project folder** :
   ```bash
   cd Admin-panel-passport-local-node

3. **Install the dependencies** :
   ```bash
   npm i
  
