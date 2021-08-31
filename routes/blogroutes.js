const express = require('express');
const router = express.Router();
const blogcontroller= require('../controllers/blogcontroller')
// blog routes
router.get('/create', blogcontroller.blog_create_get);

router.get('/', blogcontroller.blog_index);

router.post('/', blogcontroller.blog_create_post);

router.get('/:id', blogcontroller.blog_details);

router.delete('/:id', blogcontroller.blog_create_delete);

module.exports = router;