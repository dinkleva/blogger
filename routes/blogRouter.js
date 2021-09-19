const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');



//all blogs

router.get('/', blogController.blog_index);

//Blog details page

router.get('/:slug/:id', blogController.blog_details);

//for editing the blog

router.get('/me/:id/edit', blogController.blog_edit_get);

router.put('/me/:id/edit', blogController.blog_edit_put);

//for deleting the blog

router.delete('/:id', blogController.blog_delete);

//for creating the blog

router.get('/create', blogController.blog_create_get);

router.post('/create', blogController.blog_create_post);

module.exports = router;