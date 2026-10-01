const express = require("express");
const multer = require("multer");
const path = require("path");

const Photo = require("../models/Photo");
const protect = require("../middleware/authMiddleware")
const { uploadPhoto } = require("../controllers/photoController");

const router = express.Router();


// ==========================
// MULTER CONFIGURATION
// ==========================

const upload = multer({
  dest: "uploads/",
});


// ==========================
// POST - UPLOAD PHOTO
// ==========================

router.post(
  "/upload",
  upload.single("photo"),
  uploadPhoto
);


// ==========================
// GET - ALL PHOTOS
// ==========================

router.get("/",protect, async (req, res) => {
  try {

    const photos = await Photo.find().sort({
      createdAt: -1,
    });

    res.status(200).json(photos);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch photos",
      error: error.message,
    });

  }
});





module.exports = router;