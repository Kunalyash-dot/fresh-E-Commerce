 import express from 'express';
import { addAddressController, deleteAddressController, getAddressController, updateAddressController } from '../controllers/address.controller.js';
import auth from '../middleware/auth.js';


  const router = express.Router();

  router.post('/create',auth,addAddressController);
    router.get('/get',auth,getAddressController);
    router.put('/update',auth,updateAddressController);
    router.delete('/disable',auth,deleteAddressController);


  export default router;

  