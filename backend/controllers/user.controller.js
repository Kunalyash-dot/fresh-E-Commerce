import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import generatedAccessToken from "../utils/generatedAccessToken.js";
import genertedRefreshToken from "../utils/generatedRefreshToken.js";


export const registerUserController = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ message: "Please provide all fields",error : true,success : false }); 
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters",error : true,success : false });
        }
        if(mobile.length < 10 || mobile.length > 10){
            return res.status(400).json({ message: "Mobile number must be 10 digits",error : true,success : false })};
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists",error : true,success : false });
        }
        const existingMobile = await UserModel.findOne({ mobile });
        if (existingMobile) {
            return res.status(400).json({ message: "Mobile number already exists",error : true,success : false });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
       const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            mobile
        });
        // console.log(user);
        if (!user) {
            return res.status(400).json({ message: "User not created",error : true,success : false });
        }
  
        const { password: _, ...userData } = user._doc;
        res.status(201).json({message:"User Registered Successfully", user: userData, success : true,error : false });
    }
    catch (error) {
        // Mongoose Validation Error
    // if (error.name === 'ValidationError') {
    //     const errors = Object.values(error.errors).map(err => err.message);
  
    //     return res.status(400).json({
    //       success: false,
    //       message: 'Mobile number is not valid',
    //       errors // returns an array of error messages
    //     });
    //   }
        console.log(`error in registerUserController : ${error}`);
        res.status(500).json({ message: "Internal server error",error : true,success : false });
    }
   

}
export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all fields",error : true,success : false });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials",error : true,success : false });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials",error : true,success : false });
        }
        const accesstoken = await generatedAccessToken(user._id)
        const refreshToken = await genertedRefreshToken(user._id)
     const updatedUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date : new Date()
        });
     
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        res.cookie('accessToken',accesstoken,cookiesOption)
        res.cookie('refreshToken',refreshToken,cookiesOption)

    return  res.status(201).json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accesstoken,
                refreshToken
            }
        })
    } catch (error) {
        console.log(`error in loginUserController : ${error}`);
        res.status(500).json({ message: "Internal server error",error : true,success : false });
    }
}

export const logoutUserController = async (req, res) => {
    try {
       const userId = req.userId
       console.log(userId);
        if (!userId) {
            return res.status(400).json({ message: "User not found",error : true,success : false });
        }
        const user = await UserModel.findByIdAndUpdate(userId, {
            last_login_date : new Date(),
            refreshToken : ""
        });
        if (!user) {
            return res.status(400).json({ message: "User not found",error : true,success : false });
        }
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        res.clearCookie('accessToken',cookiesOption)
        res.clearCookie('refreshToken',cookiesOption)
        return res.status(200).json({ message: "Logout successfully",error : false,success : true });
    } catch (error) {
        console.log(`error in logoutUserController : ${error}`);
        res.status(500).json({ message: "Internal server error",error : true,success : false });
    }
}

export const refreshTokenController = async (req, res) => {}

export const userDetailsController = async (req, res) => {
    try {
        console.log("user details controller");
        const userId = req.userId
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ message: "User not found",error : true,success : false });
        }
        const user = await UserModel.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: "User not found",error : true,success : false });
        }
        const { password: _, ...userData } = user._doc;
        return res.status(200).json({ data: userData, success : true,error : false });
    } catch (error) {
        console.log(`error in userDetailsController : ${error}`);
        res.status(500).json({ message: "Internal server error",error : true,success : false });
    }
}

export const updateUserController = async (req, res) => {
    try {
        const userId = req.userId
        const { name, email, mobile } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User not found",error : true,success : false });
        }
        if (!name || !email || !mobile) {
            return res.status(400).json({ message: "Please provide all fields",error : true,success : false });
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists",error : true,success : false });
        }
        const existingMobile = await UserModel.findOne({ mobile });
        if (existingMobile) {
            return res.status(400).json({ message: "Mobile number already exists",error : true,success : false });
        }
        const user = await UserModel.findByIdAndUpdate(userId, {
            name,
            email,
            mobile
        }, { new : true });
        if (!user) {
            return res.status(400).json({ message: "User not updated",error : true,success : false });
        }
        const { password: _, ...userData } = user._doc;
        return res.status(200).json({ user: userData, success : true,error : false });
    } catch (error) {
        console.log(`error in updateUserController : ${error}`);
        res.status(500).json({ message: "Internal server error",error : true,success : false });
    }
}

export const updateAvatarController = async (req, res) => {
    try {
        const userId = req.userId
        const image = req.file
        if (!userId) {
            return res.status(400).json({ message: "User not found",error : true,success : false });
        }
        if (!file) {
            return res.status(400).json({ message: "Please provide a file",error : true,success : false });
        }
        const upload=await uploadImageCloudinary(image);
        if (!upload) {
            return res.status(400).json({ message: "Image not uploaded",error : true,success : false });
        }
        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar : upload.url
        });
return res.status(200).json({ message: "Avatar updated successfully",error : false,success : true ,data:{_id : userId,avatar : upload.url}});

    } catch (error) {
        console.log(`error in updateAvatarController : ${error}`);
        res.status(500).json({ message: "Internal server error",error : true,success : false });
       
    }
}