const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');

router.get('/all',commentController.getAllComments);
router.post('/add',commentController.addComment);
router.get('/:slug',commentController.getComments);
router.put('/update-comment/:id',commentController.updateComment);
router.get('/getById/:id', commentController.getCommentById);
router.delete('/delete-comment/:id', commentController.deleteCommentById);


module.exports = router