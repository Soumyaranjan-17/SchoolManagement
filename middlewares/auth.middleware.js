const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Extract token

    // Check if token exists
    if (!token) {
        return res.status(401).redirect('/admin-login');
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user data to request object
        req.user = decoded;
        
        next();
    } catch (error) {
        // If token is invalid
        res.clearCookie('token');
        return res.status(401).redirect('/admin-login');
    }
};

module.exports = authMiddleware;
