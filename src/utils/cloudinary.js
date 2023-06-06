const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const cloudinaryUpload = (url) => {
  const res = cloudinary.uploader.upload(url, { public_id: "crm_images" });
  return res;
};

module.exports = {
  cloudinaryUpload,
};
