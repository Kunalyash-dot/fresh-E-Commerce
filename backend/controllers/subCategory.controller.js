import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

export const addSubCategoryController = async (req, res) => {
    try {
        const { name, image, category } = req.body;
        if (!name || !image || !category[0]) {
            return res.status(400).send({ message: "All fields are required", error: true, success: false });
        }
        const addSubCategory = new SubCategoryModel({ name, image, category });
        const saveSubCategory = await addSubCategory.save();
        return res.status(200).send({ message: "SubCategory added successfully", success: true, data: saveSubCategory, error: false });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error", error: true, success: false });
    }
};
export const getSubCategoryController = async (req, res) => {
    try {
        const data = await SubCategoryModel.find().populate("category").sort({ createdAt: -1 });
        if (!data) {
            return res.status(404).send({ message: "No subcategory found", error: true, success: false });
        };
        return res.status(200).send({ message: "SubCategory fetched successfully", success: true, data, error: false });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error", error: true, success: false });
    }
};
export const updateSubCategoryController = async (req, res) => {
    try {
        const { _id, name, image, category } = req.body;
        if (!_id) {
            return res.status(400).send({ message: "SubCategory id is required", error: true, success: false });
        }
        const checkSubCategory = await SubCategoryModel.findById(_id);
        if (!checkSubCategory) {
            return res.status(404).send({ message: "SubCategory not found", error: true, success: false });
        }
        const updateSubCategory = await SubCategoryModel.updateOne({ _id: _id }, { name, image, category });
        if (!updateSubCategory) {
            return res.status(500).send({ message: "Failed to update subcategory", error: true, success: false });
        }
        return res.status(200).send({ message: "SubCategory updated successfully", success: true, data: updateSubCategory, error: false });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error", error: true, success: false });
    }
};
export const deleteSubCategoryController = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).send({ message: "SubCategory id is required", error: true, success: false });
        }
        const checkProduct = await ProductModel.find({ subCategory: { $in: _id } }).countDocuments();
        if (checkProduct > 0) {
            return res.status(400).send({ message: "SubCategory is used in product", error: true, success: false });
        }
        const deleteSubCategory = await SubCategoryModel.deleteOne({ _id: _id });
        if (!deleteSubCategory) {
            return res.status(500).send({ message: "Failed to delete subcategory", error: true, success: false });
        }
        return res.status(200).send({ message: "SubCategory deleted successfully", success: true, data: deleteSubCategory, error: false });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error", error: true, success: false });
    }
};