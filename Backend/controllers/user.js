const pool = require('../config/connection');
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/generateJWT");
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' '); // ✅ تحويل إلى DATETIME
    const { name, email, password , role} = req.body;

    if (!name || !email || !password ) {
        return res.status(400).json({ message: "❌ جميع البيانات مطلوبة" });
    }

    // التحقق مما إذا كان المستخدم موجودًا بالفعل
    const sql = 'SELECT * FROM user WHERE email = ?';
    pool.query(sql, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: "❌ حدث خطأ أثناء البحث عن المستخدم" });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: "🚫 المستخدم موجود بالفعل" });
        }

        // ✅ تشفير كلمة المرور قبل إدخالها
        const passwordHashed = await bcrypt.hash(password, 10);

        // ✅ إدخال المستخدم الجديد
        const insertSql = 'INSERT INTO user (name, email, password, date , role) VALUES (?, ?, ?, ? ,?)';
        pool.query(insertSql, [name, email, passwordHashed, new Date() , role], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: "❌ حدث خطأ أثناء الإدخال" });
            }

            const adminId = results.insertId; // 🔹 الحصول على ID المستخدم الجديد
            
            // ✅ توليد التوكن باستخدام `await`
            const token = await generateJWT({ email, id: adminId });

            console.log("Generated Token:", token); // ✅ تحقق من أن التوكن يتم إنشاؤه

            if (!token) {
                return res.status(500).json({ error: "❌ فشل إنشاء التوكن" });
            }

            // ✅ تحديث التوكن داخل قاعدة البيانات
            const updateSql = 'UPDATE user SET token = ? WHERE id = ?';
            pool.query(updateSql, [token, adminId], (err) => {
                if (err) {
                    return res.status(500).json({ error: "❌ حدث خطأ أثناء تحديث التوكن" });
                }

                res.status(201).json({
                    message: "✅ تم تسجيل الأدمن بنجاح",
                    id: adminId,
                    token
                });
            });
        });
    });
};



const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "❌ البريد الإلكتروني وكلمة المرور مطلوبة" });
    }

    // التحقق مما إذا كان المستخدم موجودًا بالفعل
    const sql = 'SELECT * FROM user WHERE email = ?';
    pool.query(sql, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: "❌ حدث خطأ أثناء البحث عن المستخدم" });
        }

        if (result.length === 0) { 
            return res.status(400).json({ message: "❌ المستخدم غير موجود" });
        }

        const user = result[0]; 
        
        try {
            // ✅ فك تشفير كلمة المرور والتحقق من صحتها
            const matchedPassword = await bcrypt.compare(password, user.password);
            
            if (!matchedPassword) {
                return res.status(401).json({ message: "❌ كلمة المرور غير صحيحة" });
            }

            // ✅ إنشاء توكن JWT
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "2h" }
            );
            const role = user.role;

            // ✅ تحديث التوكن في قاعدة البيانات
            const updateSql = 'UPDATE user SET token = ? WHERE id = ?';
            pool.query(updateSql, [token, user.id], (updateErr) => {
                if (updateErr) {
                    return res.status(500).json({ error: "❌ حدث خطأ أثناء تحديث التوكن" });
                }

                // ✅ إرسال الاستجابة النهائية
                res.status(200).json({
                    message: "✅ تسجيل الدخول ناجح",
                    token,
                    role
                });
            });

        } catch (error) {
            return res.status(500).json({ error: "❌ حدث خطأ أثناء التحقق من كلمة المرور" });
        }
    });
};


module.exports = {
    login,
    register
};