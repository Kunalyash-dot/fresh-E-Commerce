import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";
export const addCatrgoryController =async (req, res) => {
    try {
        const {name,image} = req.body;
        //console.log(req.body)
        if(!name || !image) {
            return res.status(400).json({message: "All fields are required",error:true,success:false});
        }
        const addCategory = new CategoryModel({name,image});
        const saveCategory = await addCategory.save();
        if(!saveCategory) {
            return res.status(500).json({message: "Failed to add category",error:true,success:false});
        }
        return res.status(200).json({message: "Category added successfully",success:true,data:saveCategory,error:false});
    } catch (error) {
        //console.log(error)
        return res.status(500).json({message: "Internal server error",error:true,success:false});
    }
}
export const getCategoryController = async (req, res) => {
try {
    const data = await CategoryModel.find().sort({createdAt: -1});
    if(!data) {
        return res.status(404).json({message: "No category found",error:true,success:false});
    }
    return res.status(200).json({message: "Category fetched successfully",success:true,data,error:false});
} catch (error) {
    //console.log(error);
    return res.status(500).json({message: "Internal server error",error:true,success:false});
}
}
export const updateCategoryController =async (req, res) => {
    try {
        //console.log("inside update category")
        const {_id, name, image} = req.body;
        if(!_id || !name || !image) {
            return res.status(400).json({message: "All fields are required",error:true,success:false});
        }
        //console.log(req.body)
        const update = await CategoryModel.updateOne({_id:_id},{name,image});
        if(!update) {
            return res.status(500).json({message: "Failed to update category",error:true,success:false});
        }
        return res.status(200).json({message: "Category updated successfully",success:true,data:update,error:false});
    } catch (error) {
        //console.log("error",error)
        return res.status(500).json({message: "Internal server error",error:true,success:false});
    }
}
export const deleteCategoryController =async (req, res) => {
    try {
        //console.log("delete category")
        //console.log(req.body)
        const {_id} = req.body;
        if(!_id) {
            return res.status(400).json({message: "Category id is required",error:true,success:false});
        }
        const checkSubCategory = await SubCategoryModel.find({category :{
            $in: {_id}
        }}).countDocuments();

        const checkProduct = await ProductModel.find({category :{
            $in: {_id}
        }}).countDocuments();
        if(checkSubCategory > 0 || checkProduct > 0) {
            return res.status(400).json({message: "Category is used in subcategory or product",error:true,success:false});
        }
        const deleteCategory = await CategoryModel.deleteOne({_id:_id});
        return res.status(200).json({message: "Category deleted successfully",success:true,data:deleteCategory,error:false});
    } catch (error) {
        //console.log(error)
        return res.status(500).json({message: "Internal server error",error:true,success:false});
    }
}