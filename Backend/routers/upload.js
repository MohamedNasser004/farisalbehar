const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// إعداد التخزين لمكتبة multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // مجلد التخزين
  },
  filename: (req, file, cb) => {
    // تعيين اسم فريد لكل ملف
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route لرفع الصور
router.post('/upload', upload.single('upload'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'لم يتم رفع الصورة بشكل صحيح.' });
  }

  // إرجاع رابط الصورة المرفوعة
  res.status(201).json({
    url: `https://api.farisalbehar.com/uploads/${req.file.filename}`,
  });
});

module.exports = router;
