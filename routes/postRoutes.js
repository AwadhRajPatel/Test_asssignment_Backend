import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,getMyPosts,
  updateMyPost, 
  deleteMyPost
} from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.get("/my-posts", protect, getMyPosts);
router.post("/my-posts", protect, upload.single("image"), createPost);
router.put("/my-posts/:id", protect, updateMyPost);
router.delete("/my-posts/:id", protect, deleteMyPost);
router.post("/", protect, upload.single("image"), createPost); // Upload a single image
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
