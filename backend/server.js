const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db/connectDB");
const router = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/photos", router);

// Start server
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});