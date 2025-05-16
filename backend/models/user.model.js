// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Provide name"]
    },
    email : {
        type : String,
        required : [true, "provide email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "provide password"]
    },
    avatar : {
        type : String,
        default : ""
    },
    mobile : {
        type : Number,
        required : [true, "provide mobile number"],
        default : null,
        // unique : true,
        // validate : {
        //     validator : function(v) {
        //         return /\d{10}/.test(v);
        //     },
        //     message : props => `${props.value} is not a valid mobile number!`
        // }
    }, 
    address_details : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Address'
        }
    ],
    shopping_cart : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'CartProduct'
        }
    ],
    orderHistory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Order'
        }
    ],
    role : {
        type : String,
        enum : ['ADMIN',"USER"],
        default : "USER"
    },
    refresh_token : {
            type : String,
            default : ""
        },
        last_login_date : {
                type : Date,
                default : ""
            },
},{
    timestamps : true
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel


    // verify_email : {
    //     type : Boolean,
    //     default : false
    // },
    // 
    // status : {
    //     type : String,
    //     enum : ["Active","Inactive","Suspended"],
    //     default : "Active"
    // },
   
    // forgot_password_otp : {
    //     type : String,
    //     default : null
    // },
    // forgot_password_expiry : {
    //     type : Date,
    //     default : ""
    // },
   