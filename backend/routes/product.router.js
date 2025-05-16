 import express from 'express';
import { createProductController, deleteProductDetailsController, getProductByCategoryAndSubCategoryController, getProductByCategoryController, getProductController, getProductDetailsController, searchProductController, updateProductDetailsController } from '../controllers/product.contoller.js';
import { admin } from '../middleware/Admin.js';
import  auth  from '../middleware/auth.js';

  const router = express.Router();

  router.post("/create",auth,admin,createProductController);
    router.post("/get-product", getProductController);
    router.post("/get-product-by-category", getProductByCategoryController);
    router.post("/get-product-by-category-and-subcategory", getProductByCategoryAndSubCategoryController);
    router.post("/get-product-details", getProductDetailsController);

    router.put("/update-product-details",auth,admin,updateProductDetailsController);
    router.delete("/delete-product",auth,admin,deleteProductDetailsController);
    router.post("/search-product", searchProductController);

  export default router;

