import razorpay from '../config/razorpay.js';
import crypto from 'crypto';
import mongoose from 'mongoose';
import OrderModel from '../models/order.model.js'
import UserModel from '../models/user.model.js'
import CartProductModel from '../models/cartProduct.model.js'

export const cashOnDeliveryOrderController =async (req,res)=>{
try {
    const userId = req.userId;
      const { list_items, totalAmt, addressId,subTotalAmt } = req.body 

const payload = list_items.map(el => {
            return({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id, 
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image
                } ,
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                delivery_address : addressId ,
                subTotalAmt  : subTotalAmt,
                totalAmt  :  totalAmt,
            })
        })

 const generatedOrder = await OrderModel.insertMany(payload)

        ///remove from the cart
        const removeCartItems = await CartProductModel.deleteMany({ userId : userId })
        const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

        return res.json({
            message : "Order successfully",
            error : false,
            success : true,
            data : generatedOrder
        })


} catch (error) {
     return res.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
}
}
export const paymentContoller =async (req,res)=>{
    try {
        const userId = req.userId;
        const {list_items,totalAmt,addressId,subTotalAmt} = req.body;

        const options = {
             amount: totalAmt * 100, // amount in paisa
      currency: "INR",
      receipt: `rcptid-${new mongoose.Types.ObjectId()}`,
        }
    const order = await razorpay.orders.create(options);

    return res.json({
      success: true,
      order,
    });



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal Sever Error",
            success:false,
            error:error.message || error
        })
    }
}

export const paymentVerifyController = async (req,res)=>{
try {

    const userId = req.userId;
    console.log(`userId payment verification  ${userId}`);
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature,list_items,addressId,totalAmt,subTotalAmt} = req.body;

    const generatedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");

    if(generatedSignature !== razorpay_signature) {
        return res.status(400).json({
            success:false,
            error:true,
            message:"Payment Verification failed"
        })
    }

    const payload = list_items.map((element)=>({
        userId:userId,
        orderId:`ORD-${new mongoose.Types.ObjectId()}`,
        productId:element.productId._id,
        product_details:{
            name:element.productId.name,
            image:element.productId.image,
        },
        paymentId:razorpay_payment_id,
        payment_status:"PAID",
        delivery_address:addressId,
        subTotalAmt:subTotalAmt,
        totalAmt:totalAmt
    }));

    const order = await OrderModel.insertMany(payload);
    const checkres=await CartProductModel.deleteMany({userId});
    console.log(checkres)
    await UserModel.findByIdAndUpdate(userId,{shopping_cart:[],});

    return res.json({
        success:true,
        message:"Payment verified and order placed",
        order,
    })

} catch (error) {
    return res.status(500).json({
        success:false,
        error:error.message || error
    })
}
}
export const webhookstripe = (req,res)=>{}
export const getOrderDetailsController = async(req,res)=>{
    try {
        const userId = req.userId;
        const orderlist = await OrderModel.find({userId : userId}).sort({createAt:-1}).populate('delivery_address');

        return res.json({
            message:'order list',
             data : orderlist,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error:true,
            success: false
        })
    }
} 

export const getOrderForAdmin=async(req,res)=>{
try {
    const orderlist = await OrderModel.find().sort({createdAt: -1}).populate('delivery_address').populate("userId")
    res.status(200).json({
        message:"All Order Data",
        success:true,error:false,data:orderlist
    })
} catch (error) {
     return res.status(500).json({
            message: error.message || error,
            error:true,
            success: false
        })
}
}