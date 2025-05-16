import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";

export const createProductController = async (req, res) => {

  try {
    const { 
        name ,
        image ,
        category,
        subCategory,
        stock,
        price,
        discount,
        description,
        more_details,
    } = req.body 

    if(!name || !image[0] || !category[0] || !subCategory[0] || !price || !description ){
        return response.status(400).json({
            message : "Enter required fields",
            error : true,
            success : false
        })
    }
    const categoryObjectIds = category.map(id => new mongoose.Types.ObjectId(id));
    const subCategoryObjectIds = subCategory.map(id => new mongoose.Types.ObjectId(id));

    const product = new ProductModel({
        name ,
        image ,
       category: categoryObjectIds,
      subCategory: subCategoryObjectIds,

        stock,
        price,
        discount,
        description,
        more_details,
    })
    const saveProduct = await product.save()

    return res.json({
        message : "Product Created Successfully",
        data : saveProduct,
        error : false,
        success : true
    })

} catch (error) {
   
    return res.status(500).json({
        message : error.message || error,
        error : true,
        success : false
    })
}
   
}
export const getProductController = async (req, res) => {
    try {
       
        let{page,limit,search} = req.body;
       
        if(!page || !limit) {
            page = 1;
            limit = 20  ;
        };
        const skip = (page - 1) * limit;
        const query = search ?{
            $text: {
                $search: search
            }
        }:{}
        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("category").populate("subCategory"),
            ProductModel.countDocuments(query)
        ]);
       
        return res.status(200).json({ message: "Product fetched successfully", error: false, success: true, data, totalCount,totalNoPage:Math.ceil(totalCount/limit) });
    } catch (error) {
        //console.log(error)
        return res.status(500).json({ message: "Internal server error", error: true, success: false });
    }
}
export const getProductByCategoryController = async (req, res) => {
    try {
        const {id} = req.body;
        if(!id) {
            return res.status(400).json({ message: "Category id is required", error: true, success: false });
        }
        const products = await ProductModel.find({ category: {$in:id }}).populate("category").populate("subCategory").limit(20);
        if(!products) {
            return res.status(404).json({ message: "No products found", error: true, success: false });
        }
        return res.status(200).json({ message: "Products fetched successfully", error: false, success: true, data: products });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: true, success: false });
    }
}
export const getProductByCategoryAndSubCategoryController = async (req, res) => {
    try {
        const {categoryId, subCategoryId,page,limit} = req.body;
        if(!categoryId || !subCategoryId) {
            return res.status(400).json({ message: "Category id and subcategory id are required", error: true, success: false });
        }
        if(!page || !limit) {
            page = 1;
            limit = 10;
        };
        const skip = (page - 1) * limit;
        const query = {
            category: {$in:categoryId},
            subCategory: {$in:subCategoryId}
        }
        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("category").populate("subCategory"),
            ProductModel.countDocuments(query)
        ]);
        if(!data) {
            return res.status(404).json({ message: "No products found", error: true, success: false });
        }
        return res.status(200).json({ message: "Products fetched successfully", error: false, success: true, data, totalCount,page,limit });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: true, success: false });
    }
}
export const getProductDetailsController = async (req, res) => {
    try {
        const {productId} = req.body;
        if(!productId) {
            return res.status(400).json({ message: "Product id is required", error: true, success: false });
        }
        const product = await ProductModel.findOne({_id: productId}).populate("category").populate("subCategory");
        if(!product) {
            return res.status(404).json({ message: "Product not found", error: true, success: false });
        }
        return res.status(200).json({ message: "Product fetched successfully", error: false, success: true, data: product });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: true, success: false });
    }
}
export const updateProductDetailsController = async (req, res) => {
    try {
        const {_id} = req.body;
        if(!_id) {
            return res.status(400).json({ message: "Product id is required", error: true, success: false });
        }
        const updateProduct = await ProductModel.updateOne({_id: _id}, {...req.body});
        if(!updateProduct) {
            return res.status(404).json({ message: "Product not found", error: true, success: false });
        }
        return res.status(200).json({ message: "Product updated successfully", error: false, success: true, data: updateProduct });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: true, success: false });
    }
}
export const deleteProductDetailsController = async (req, res) => {
    try {
        const {_id} = req.body;
        if(!_id) {
            return res.status(400).json({ message: "Product id is required", error: true, success: false });
        }
        const deleteProduct = await ProductModel.deleteOne({_id: _id});
        if(!deleteProduct) {
            return res.status(404).json({ message: "Product not found", error: true, success: false });
        }
        return res.status(200).json({ message: "Product deleted successfully", error: false, success: true, data: deleteProduct });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: true, success: false });
    }
}
export const searchProductController = async (req, res) => {
    try {
        let {search,page,limit} = req.body;
         //console.log(`search ${search}`)
        if(!search) {
            return res.status(400).json({ message: "Search term is required", error: true, success: false });
        }
        if(!page || !limit) {
            page = 1;
            limit = 10;
        };
        const skip = (page - 1) * limit;
        const query = search ?{
            $text: {
                $search: search
            }
        }:{}
        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("category").populate("subCategory"),
            ProductModel.countDocuments(query)
        ]);
        if(!data) {
            return res.status(404).json({ message: "No products found", error: true, success: false });
        }
        return res.status(200).json({ message: "Products fetched successfully", error: false, success: true, data, totalCount,page,limit,totalPage:Math.ceil(totalCount/limit) });
    } catch (error) {
        //console.log(error)
        return res.status(500).json({ message: "Internal server error", error: true, success: false });
    }
}