import uploadImageCloudinary from "../utils/uploadImageClodinary.js";
export const uploadImageController = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const uploadImage = await uploadImageCloudinary(file);
        return res.status(200).json({
            message: "Image uploaded successfully",
            data: uploadImage,
            suceess: true,
            error:false
        });
    
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false,
        });
    }
}