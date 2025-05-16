 import express from 'express';
import { addSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from '../controllers/subCategory.controller.js';
import auth from '../middleware/auth.js';

  const router = express.Router();

  router.post('/create-subCategory', auth,addSubCategoryController);
  router.post('/get-subCategory', getSubCategoryController);
    router.put('/update-subCategory', auth, updateSubCategoryController);
    router.delete('/delete-subCategory', auth, deleteSubCategoryController);
  export default router;

  