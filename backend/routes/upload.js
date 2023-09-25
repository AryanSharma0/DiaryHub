require("dotenv").config();
const cloudinary = require("cloudinary");
const cloudinary_image = (image) => {

  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      image,
      { use_filename: true, unique_filename: true },
      function (error, result) {
        if (result && result.secure_url) {
          resolve(result.secure_url);
        } else {
          reject({ message: error.message });
        }
      }
    );
  });
};

module.exports = cloudinary_image; 
     