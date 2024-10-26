const jwt = require('jsonwebtoken');
module.exports.adminmiddleware = (req, res, next) => {
    const token = req.cookies.admintoken; 
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.jwtsecret);
            if (decoded.adminusername) {
                req.id=decoded.adminid;
                next(); 
            } else {
                return res.status(403).json({ message: 'Forbidden: Not an admin' });
            }
        } catch (error) {
            return res.status(401).json({ message: `Not authorized - ${error.message}` });
        }
    } else {
        return res.status(401).json({ message: 'Not Authorized, No token' });
    }
};
