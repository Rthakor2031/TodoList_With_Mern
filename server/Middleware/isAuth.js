const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Access token correctly

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized! No token provided please try to Login..." });
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        
        req.id = decodedToken.UserId;
        next();
    } 
    catch (error) {
        return res.status(401).json({ success: false, message: "Authentication failed" });
    }
};

module.exports = isAuth;
