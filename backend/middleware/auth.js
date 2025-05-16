import jwt from 'jsonwebtoken'


const auth = async (req, res, next) => {
    try {
        //console.log("auth middleware");
        //console.log(req.cookies.accessToken);
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Provide Token or Login!", error: true, success: false })
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if (!decode) {
        return res.status(401).json({ message: "Unauthorized Provide Token!", error: true, success: false })
    }
    //console.log(decode);
   
        req.userId = decode.id
        next()
  
        
    } catch (error) {
        //console.log(`error in auth middleware : ${error}`);
        res.status(500).json({ message: "You have not login",error : true,success : false });
        
    }
}

export default auth;