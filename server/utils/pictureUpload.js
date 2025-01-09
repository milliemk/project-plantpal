import { v2 as cloudinary } from "cloudinary";

const pictureUpload = async (filePath) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(filePath, {
      folder: "plant-app",
    });

    return uploadedImage;
  } catch (error) {
    console.log("error uploading to cloudinary :>> ", error);

    return null;
  }
};

export { pictureUpload };
