 import express from 'express';
import { addToCartItemController, getCartItemsController, removeCartItemQtyController, updateCartItemQtyController } from '../controllers/cart.controller.js';
import auth from '../middleware/auth.js';

  const router = express.Router();

  router.post('/create',auth,addToCartItemController);
  router.get('/getcartitems',auth,getCartItemsController);
  router.put('/updatecartitemqty',auth,updateCartItemQtyController);
  router.delete('/deletecartitemqty',auth,removeCartItemQtyController);

  export default router;

  