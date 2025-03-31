import Post from "../models/Post.js";
import fs from "fs"; // For file handling

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const imagePath = req.file ? req.file.path : null; // Use Cloudinary path

    const post = await Post.create({
      title,
      content,
      image: imagePath, // Save Cloudinary URL
      author: req.user.id
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const post = await Post.create({
      title,
      content,
      image: imagePath,
      author: req.user.id
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/

// Get All Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, content } = req.body;
    if (req.file) {
      post.image = `/uploads/${req.file.filename}`;
    }

    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Posts by Authenticated User
export const getMyPosts = async (req, res) => {
    try {
      const userId = req.user.id; // Get logged-in user's ID
      const posts = await Post.find({ author: userId }).populate("author", "username");
  
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  export const updateMyPost = async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id, author: req.user.id });
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      const { title, content } = req.body;
      if (req.file) {
        post.image = `/uploads/${req.file.filename}`;
      }
  
      post.title = title || post.title;
      post.content = content || post.content;
  
      const updatedPost = await post.save();
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete user's own post
  export const deleteMyPost = async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id, author: req.user.id });
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      await post.deleteOne();
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
//  Export all functions once (Ensure no duplicate exports)
//export { createPost, getPosts, getPost, updatePost, deletePost };
