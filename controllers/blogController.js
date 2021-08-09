const { models } = require('mongoose');
const Blog = require('../models/blogs');
const User = require('../models/user')
const ars = require('arslugify')

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete




const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) =>{
            res.render('blogs/index', {title: 'All Blogs', blogs: result});

        })
        .catch((err) => console.log(err))
}


const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', {title: 'Details Page', blog: result});
        })
        .catch((err) => {
            console.log(err)
        });
}


const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Blogs' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.slug = ars(req.body.title)
    console.log(blog.slug)

    blog.save()
        .then((result) =>{
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) =>{
            res.json({ redirect: '/blogs'})
        })
        .catch(err => console.log(err));
}

module.exports = 
{
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
}