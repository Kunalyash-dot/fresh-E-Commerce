 import express from 'express';
import { uploadImageController } from '../controllers/uploadImage.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

  const router = express.Router();

  router.post("/upload", auth, upload.single("image"),uploadImageController)
  export default router;

  