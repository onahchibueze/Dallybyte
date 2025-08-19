import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
// Configuration
cloudinary.config({
  cloud_name: "dnotg87ro",
  api_key: "679613849123529",
  api_secret: "vCh5Qa9imdXglWGUVE7KnEKwZig", // Click 'View API Keys' above to copy your API secret
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dallybyte_uploads",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});
const upload = multer({ storage });
export default upload;
