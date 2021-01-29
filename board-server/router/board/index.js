const express = require('express');
const router = express.Router();

const { boardController } = require('../../controllers');

router.post('/addPost', boardController.addPost);
router.get('/readPost', boardController.readPost);
router.put('/updatePost', boardController.updatePost);
router.post('/deletePost', boardController.deletePost);
router.post('/detailPost', boardController.detailPost);
module.exports = router;
