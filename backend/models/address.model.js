import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      },
      fullName: { type: String, required: true },
      mobile: { type: String, required: true },
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" },
      landmark: { type: String },
      // type: { 
      //   type: String, 
      //   enum: ["Home", "Work", "Other"], 
      //   default: "Home" 
      // },
      status: { type: Boolean, default: true }
    }
,{
    timestamps : true
})

const AddressModel = mongoose.model('Address',addressSchema)

export default AddressModel