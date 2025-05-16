import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Product name is required"],
   
  },

  description: {
    type: String,
    // required: [true, "Product description is required"]
    default: ""
  },

  price: {
    type: Number,
    // required: [true, "Product price is required"]
    default: null
  },

  discount: {
    type: Number,
    default: null // Percent (e.g., 10 = 10%)
  },

  stock: {
    type: Number,
    // required: true,
    default: null
  },


image: {
    type: Array,
    default: [],
  },
  category : [
    {
        type : mongoose.Schema.ObjectId,
        ref : 'Category'
    }
],
subCategory : [
    {
        type : mongoose.Schema.ObjectId,
        ref : 'subCategory'
    }
],


more_details: {
    type: Object,
    default: {}
  },
  publish : {
    type : Boolean,
    default : true
}

}, {
  timestamps: true
});
//create a text index
productSchema.index(
  { name: "text", description: "text" },
  {
    weights: { name: 10, description: 5 },
    name: "TextIndex"
  }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;


  // brand: {
  //   type: String,
  //   default: ""
  // },

  // ratings: {
  //   type: Number,
  //   default: 0
  // },

  // total_reviews: {
  //   type: Number,
  //   default: 0
  // },

  // isFeatured: {
  //   type: Boolean,
  //   default: false
  // },

  // isDeleted: {
  //   type: Boolean,
  //   default: false
  // },
   // variants: [
  //   {
  //     sku: String,
  //     color: String,
  //     size: String,
  //     quantity: Number
  //   }
  // ],

  // tags: [String], // for filtering or search

//   seller: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User"
//   }