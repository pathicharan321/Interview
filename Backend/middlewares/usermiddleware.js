const jwt = require('jsonwebtoken');
module.exports.usermiddleware=(req,res,next)=>{
    const token=req.cookies.usertoken;
    if (token){
        try {
            const decoded = jwt.verify(token, process.env.jwtsecret);
            if(decoded.username){
                next();
            }
        }
        catch (error) {
            res.status(401).json({
                message: `No authorized - ${error}`
            })
        }
    };
    if(!token){
        return res.status(401).json({ message: 'Not Authorized, No token' });
    }
}

