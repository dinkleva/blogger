function authUser(req , res, next){

    if(req.user == null){
        res.status(403)
        return res.send('Your need to log in')
    }
        next()
}


module.exports = {
    authUser,
}