const { models } = require('mongoose');
const Blog = require('../models/blogs');
const User = require('../models/user')
const ars = require('arslugify')
const jwt = require('jsonwebtoken')



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
    res.render('blogs/create', { title: 'Write Blog' , blog: ''});
}

const blog_create_post = async (req, res) => {

    //Getting token which is set after login so that we can extract the user's information
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) =>{
            const blog = new Blog(req.body)
            blog.slug = ars(req.body.title)
            const user = await User.findById(decodedToken.id)
            blog.author.name = user.name
            blog.author.id = user._id
            console.log(blog.author)

                blog.save()
                    .then((result) =>{
                        res.redirect('/blogs')
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                })

    }
    else{
        console.log('Not found the user')
    }

    

    
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) =>{
            res.json({ redirect: '/'})
        })
        .catch(err => console.log(err));
}

//page for editing the blog
const blog_edit_get = (req, res) =>{
    const id = req.params.id

    Blog.findById(id)
        .then((result) =>{
            res.render('blogs/create', {title: "Edit Page", blog: result})
        })
        .catch( err => {
            console.log(err)
        })


    
}

//editing will be done and replaced in datatbase for the blog
const blog_edit_put = async (req, res) => {
    const blogid = req.params.id
    var blog
    try{

    blog = await Blog.findOneAndUpdate({_id: blogid}, {$set: {title: req.body.title, snippet: req.body.snippet, blog: req.body.blog}}, {
        
        useFindAndModify:false,
    })
    await Blog.findByIdAndDelete({_id: blogid})
    // console.log(blog)
    const userid = blog.author.id
    const user = await User.findById({_id: userid})
    
    // blog.update()
    // res.cookie('user', user, { httpOnly: true , secure: true})
    console.log(blog._id)
    res.status(201).json({ user: user })

    }

    catch (err) {
        console.log(err)
    }
    
}


module.exports = 
{
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_edit_get,
    blog_edit_put,
}