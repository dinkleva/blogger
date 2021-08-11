const express = require('express');
const app = express();
const mongoose = require('mongoose')
const { models } = require('mongoose')
require('dotenv').config()




//Routers
const blogRouter = require('./routes/blogRouter');
const userRouter = require('./routes/userRouter')
const signupRouter = require('./routes/signupRouter')
const signinRouter = require('./routes/signinRouter')

//for all user authentication works
// const { users } = require('./data');
// const { authUser } = require('./routes/basicAuth');


//engine for ejs
app.set('view engine', 'ejs');




//connect to mongodb atlas database(gaurav-database)

const dbURI = process.env.MONGODB_URI
//const dbURI = "mongodb+srv://dinkleva_123:dinkleva123@cluster0.xhi9f.mongodb.net/gaurav-database?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(process.env.PORT || 3000))
.catch((err) => console.log(err));

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => app.listen(3000))
//     .catch((err) => console.log(err));


//MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));





app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});

    res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root: __dirname})
    res.render('about', { title: 'About' });
});



//login page
// app.get('/login', (req, res) => {
//     res.render('users/login.ejs', {title: 'Login'})
// })



//All Middlewares
app.use('/blogs', blogRouter)
app.use('/signin', signinRouter)
app.use('/signup', signupRouter)
app.use('/user', userRouter)






app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', { title: 'Not Found' });
});