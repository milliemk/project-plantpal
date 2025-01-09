import { v2 as cloudinary } from "cloudinary";

const pictureDelete = async (publicId) => {
  try {
    const deletedImage = await cloudinary.uploader.destroy(publicId);
    console.log("deletedImage :>> ", deletedImage);
  } catch (error) {
    console.log("error deleting image :>> ", error);
  }
};

export { pictureDelete };
