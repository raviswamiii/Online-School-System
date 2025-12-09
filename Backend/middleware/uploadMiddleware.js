import multer from "multer";
import path from "path";
import fs from "fs";

// ---------------- CREATE UPLOAD FOLDER ---------------- //
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// ---------------- STORAGE ENGINE ---------------- //
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// ---------------- FILE FILTER ---------------- //
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extName) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, webp)."));
  }
};

// ---------------- MULTER INSTANCE ---------------- //
const upload = multer({
  storage,
  fileFilter,
  // limits: { fileSize: 2 * 1024 * 1024 }, // optional: 2MB limit
});

// ---------------- EXPORT FIELDS ---------------- //
// EXACTLY these fields match your React FormData
export const uploadSchoolFields = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "images", maxCount: 20 },
  { name: "teamImages", maxCount: 20 },
]);

export default upload;
