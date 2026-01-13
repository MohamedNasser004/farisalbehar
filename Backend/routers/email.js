const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post("/send", async (req, res) => {
  const { name, phone, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.farisalbehar.com",
    port: 465,
    secure: true,
    auth: {
      user: "sales@farisalbehar.com",
      pass: "" // ضع كلمة المرور
    }
  });

  const mailOptions = {
    from: `"موقع فارس البحار" <sales@farisalbehar.com>`,
    to: "sales@farisalbehar.com",
    subject: "رسالة من نموذج التواصل",
    replyTo: email, // 🔥 هنا السحر
    html: `
      <h3>الاسم:</h3><p>${name}</p>
      <h3>رقم الهاتف:</h3><p>${phone}</p>
      <h3>البريد الإلكتروني:</h3><p>${email}</p>
      <h3>الرسالة:</h3><p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "تم إرسال الرسالة بنجاح.",
    });

  } catch (error) {
    console.log("Email Error:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إرسال الرسالة.",
    });
  }
});

module.exports = router;
