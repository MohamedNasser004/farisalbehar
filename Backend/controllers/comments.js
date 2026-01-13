const express = require('express');
const pool = require('../config/connection');
const nodemailer = require('nodemailer');

//  الإيميل
const transporter = nodemailer.createTransport({
    host: "smtp.alyusrforshipping.com",
    port: 465,
    secure: true,
    auth: {
        user: '',
        pass: '' // ضع هنا كلمة المرور الصحيحة
    }
});

//  إرسال الإيميل
const sendEmail = (to, subject, message) => {
    const mailOptions = {
        from: '',
        to,
        subject,
        html: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("خطأ في إرسال الإيميل:", error.message);
        } else {
            console.log("تم إرسال الإيميل:", info.response);
        }
    });
};

// دالة التحديث
const updateComment = (req, res) => {
    const { id } = req.params;
    const { comment, name, email, articleName , commentStatus } = req.body;

    pool.query(
        'UPDATE comments SET comment = ?, name = ?, email = ?, articleName = ? , commentStatus= ? WHERE id = ?',
        [comment, name, email, articleName,commentStatus, id],
        (err, results) => {
            if (err) {
                console.error("خطأ أثناء تحديث التعليق:", err.message);
                return res.status(500).json({ message: "حدث خطأ أثناء تحديث التعليق" });
            }

            if (results.affectedRows > 0) {
                res.status(200).json({ message: "تم تحديث التعليق بنجاح" });
            } else {
                res.status(404).json({ message: "لم يتم العثور على التعليق المطلوب" });
            }
        }
    );
};

// اضافة تعليق
const addComment = (req, res) => {
    const { comment, name, email, articleName, commentType, parentId, commentStatus } = req.body;
    const currentDate = new Date();

    if (!parentId) {
        pool.query(
            'INSERT INTO comments (comment, name, email, articleName, date ) VALUES (?, ?, ?, ?, ?)',
            [comment, name, email, articleName, currentDate],
            (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ message: "حدث خطأ أثناء إضافة التعليق" });
                }

                sendEmail(
                    'support@alyusrforshipping.com',
                    `تعليق جديد على المقالة: ${articleName}`,
                    `<h3>تم إضافة تعليق جديد:</h3>
                    <p><strong>الاسم:</strong> ${name}</p>
                    <p><strong>البريد الإلكتروني:</strong> ${email}</p>
                    <p><strong>التعليق:</strong> ${comment}</p>`
                );

                res.status(200).json({ message: "تم إضافة التعليق بنجاح بانتظار المصادقة عليه" });
            }
        );
    } else {
        pool.query(
            'INSERT INTO comments (comment, name, email, articleName, date, commentType, parentId , commentStatus) VALUES (?, ?, ?, ?, ?, ?, ? , ?)',
            [comment, name, email, articleName, currentDate, commentType, parentId , commentStatus],
            async (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ message: "حدث خطأ أثناء إضافة الرد" });
                }

                pool.query(
                    'SELECT email FROM comments WHERE id = ?',
                    [parentId],
                    (err, results) => {
                        if (err) {
                            console.error("خطأ أثناء جلب إيميل صاحب التعليق:", err.message);
                        } else if (results.length > 0) {
                            const parentEmail = results[0].email;

                            sendEmail(
                                parentEmail,
                                `رد جديد على تعليقك في مقال: ${articleName}`,
                                `<h3>لديك رد جديد على تعليقك:</h3>
                                <p><strong>اسم المعلق:</strong> ${name}</p>
                                <p><strong>التعليق:</strong> ${comment}</p>
                                <p>يمكنك متابعة الردود من خلال موقعنا.</p>`
                            );

                            console.log(`تم إرسال الإيميل إلى ${parentEmail} بنجاح`);
                        }
                    }
                );

                res.status(200).json({ message: "تم إضافة الرد بنجاح بانتظار المصادقة عليه" });
            }
        );
    }
};

// جلب التعليقات
const getComments = (req, res) => {
    const slug = req.params.slug;

    pool.query('SELECT * FROM comments WHERE articleName = ? ORDER BY date DESC', [slug], (err, results) => {
        if (err) {
            console.error("Error fetching comments:", err);
            return res.status(500).json({ message: "حدث خطأ أثناء استرجاع التعليقات" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "لا توجد تعليقات مضافة لهذه المقالة" });
        }

        const mainComments = results.filter(comment => comment.parentId === 0);
        const replies = results.filter(comment => comment.parentId !== 0);
        res.status(200).json({ mainComments, replies });
    });
};

// جلب كل التعليقات
const getAllComments = async (req, res) => {
    try{
        pool.query('SELECT * FROM comments ORDER BY date DESC', (err, results) => {
        if (err) {
            return res.status(500).json({ message: "حدث خطأ أثناء جلب التعليقات" });
        }
        res.status(200).json(results);
    });
    }
    catch(err){
        res.status(500).json({message: "error"})
    }
    
};

// جلب تعليق بواسطة id
const getCommentById = (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM comments WHERE id = ? ORDER BY date DESC', [id], (err, results) => {
        if (err) {
            console.error("Error fetching comment by slug:", err.message);
            return res.status(500).json({ message: "حدث خطأ أثناء استرجاع بيانات التعليق" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "التعليق غير موجود" });
        }

        // إذا كنت تريد جلب أول تعليق فقط:
        res.status(200).json(results[0]);
    });
};

// حذف تعليق بواسطة id
const deleteCommentById = (req, res) => {
    const { id } = req.params;

    pool.query('DELETE FROM comments WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "حدث خطأ أثناء حذف التعليق" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "التعليق غير موجود" });
        }

        res.status(200).json({ message: "تم حذف التعليق بنجاح" });
    });
};


module.exports = {
    addComment,
    getComments,
    updateComment ,
    getAllComments,
    getCommentById,
    deleteCommentById
};
