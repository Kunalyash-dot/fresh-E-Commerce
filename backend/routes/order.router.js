 import express from 'express';
import { cashOnDeliveryOrderController, getOrderDetailsController, paymentContoller, paymentVerifyController, webhookstripe,getOrderForAdmin } from '../controllers/order.controller.js';
import auth from '../middleware/auth.js'
import {admin} from '../middleware/Admin.js'
  const router = express.Router();

  router.post("/cash-on-delivery",auth,cashOnDeliveryOrderController);
  router.post("/payment/create",auth,paymentContoller);
  router.post("/payment/verify",auth,paymentVerifyController);
  router.get("/order-list",auth,getOrderDetailsController)
      router.get('/getAllOrder',auth,admin,getOrderForAdmin)
  export default router;

  