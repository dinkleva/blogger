const express = require('express')
const router = express.Router()



router.get('/', (req,res) =>{
    res.render('signup', {title: 'Signup'})

})




module.exports = router