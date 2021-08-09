const { models } = require('mongoose')
// const Blog = require('../models/blogs')
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')


router.get('/', (req, res, next) =>{
    res.render('signin', {title: 'Login'})
})

router.post('/verification', async (req, res) =>{

    const user = await User.findOne({email:req.body.email})
    if(user == null){
        res.status(401).send('User not found')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.redirect('/blogs', {username: user.name})
        }
        else{
            res.send('Not Allowed')
        }
    }
    catch{
        res.status(401)
    }

})




module.exports = router