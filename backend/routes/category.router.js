 import express from 'express';
 import auth from '../middleware/auth.js';
import { addCatrgoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../controllers/category.controller.js';

  const router = express.Router();

  router.post("/add-category", auth,addCatrgoryController);
    router.get("/get-category", getCategoryController);
    router.put("/update-category", auth,updateCategoryController);
    router.delete("/delete-category",auth,deleteCategoryController);
    
  export default router;

  