const Photo = require("../models/Photo");

const uploadPhoto = async (req, res) => {
  try {
    console.log("PHOTO ROUTE HIT");
    console.log("FILE:", req.file);

    const photo = await Photo.create({
      filename: req.file.filename,
      path: req.file.path,
    });

    res.status(201).json({
      message: "Photo uploaded successfully",
      photo,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};

module.exports = {
  uploadPhoto,
};