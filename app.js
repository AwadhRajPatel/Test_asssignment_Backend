import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import upload from "./middleware/uploadMiddleware.js";

dotenv.config();
connectDB();

const app = express();
// app.use(cors());
app.use(cors({
  origin: ["http://localhost:3000","https://zesty-crisp-55d98a.netlify.app/"] ,// Allow requests from frontend
  credentials: true
}));
app.use(express.json());

// Image Upload Route
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ imageUrl: req.file.path }); // Return Cloudinary file URL
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    message: "API is running",
    error: false,
  })
});

// Dynamic Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/**
 * https://test-asssignment-backend.vercel.app/
 */