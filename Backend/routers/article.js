const express = require('express');
const router = express.Router();
const { getAllArticles, addNewArticle, upload ,getArticle, updateArticle, deleteArticle} = require('../controllers/article');
const allowedTo = require('../middleware/allowedTo');
const verifyToken = require('../middleware/verifyToken');
const checkApiKey = require('../middleware/checkApiKey');

// ✅ استدعاء الـ Middleware الخاص بـ Multer هنا
router.post('/add',verifyToken, allowedTo('admin'), upload.single('photo'), addNewArticle);
router.get('/all',  checkApiKey, getAllArticles);
router.get('/:slug',   checkApiKey, getArticle);
router.put('/update/:slug',upload.single('photo'), updateArticle);
router.delete('/delete/:slug', deleteArticle);

module.exports = router;
