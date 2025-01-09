import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  /*   console.log("req :>> ", req); */
  console.log("file :>> ", file);

  const fileExtension = path.extname(file.originalname);
  // fileExension will store ".png" or similar

  if (
    fileExtension !== ".jpeg" &&
    fileExtension !== ".jpg" &&
    fileExtension !== ".png"
  ) {
    console.log("file not supported", fileExtension);
    // To reject this file pass `false`, like so:
    cb(null, false);
  } else {
    console.log("file accepted");
    // To accept the file pass `true`, like so:
    cb(null, true);
  }

  /*   // You can always pass an error if something goes wrong:
  cb(new Error("I don't have a clue!")); */
};

const multerUpload = multer({ storage: storage, fileFilter: fileFilter });

export default multerUpload;
