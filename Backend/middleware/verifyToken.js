const jwt = require('jsonwebtoken');
const pool = require('../config/connection'); // تأكد إنك جايب الاتصال بقاعدة البيانات

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json("Token is required");
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;

        // نجيب بيانات المستخدم من قاعدة البيانات
        pool.query("SELECT * FROM user WHERE id = ?", [userId], (err, result) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json("Server error");
            }

            if (result.length === 0) {
                return res.status(401).json("User not found");
            }

            req.currentUser = result[0];

            console.log("✅ المستخدم الحالي:", req.currentUser);

            next();
        });

    } catch (err) {
        console.error("❌ Invalid Token:", err.message);
        return res.status(401).json('Invalid token');
    }
}

module.exports = verifyToken;
