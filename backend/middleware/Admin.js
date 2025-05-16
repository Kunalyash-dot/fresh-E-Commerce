import UserModel from '../models/user.model.js'

export const admin =async (req, res, next) => {
    try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    if(user.role !== 'ADMIN'){
        return res.status(403).json({message: 'Access denied',error:true,success:false});
    }
    next();
} catch (error) {
    //console.log("In Admin middileware",error)
    return res.status(500).json({message: 'Internal server error',error:true,success:false});
}
}