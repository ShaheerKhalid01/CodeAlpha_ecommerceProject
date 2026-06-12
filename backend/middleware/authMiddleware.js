const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    console.log('Middleware hit!');
    
    let token;

    try {
        const authHeader = req.headers.authorization;
        console.log('Auth Header:', authHeader);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token nahi hai' });
        }

        token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token empty hai' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User nahi mila' });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

// ← Yeh naya admin middleware add karo
const admin = (req, res, next) => {
    console.log('Admin check!');
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Sirf admin access kar sakta hai' });
    }
};

module.exports = { protect, admin };