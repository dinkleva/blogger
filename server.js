const express = require('express');
const app = express();
const mongoose = require('mongoose')
const { models } = require('mongoose')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')
require('dotenv').config()
const methodOverride = require('method-override')




//Routers
const blogRouter = require('./routes/blogRouter');
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')


//for all user authentication works
// const { users } = require('./data');
// const { authUser } = require('./routes/basicAuth');


//engine for ejs
app.set('view engine', 'ejs');




//connect to mongodb atlas database(gaurav-database)


// const dbURI = process.env.MONGODB_URI
const dbURI = process.env.MONGO_URI
const port = process.env.PORT
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));
    
// const dbURI = process.env.MONGODB_URI
//const dbURI = "mongodb+srv://dinkleva_123:dinkleva123@cluster0.xhi9f.mongodb.net/gaurav-database?retryWrites=true&w=majority"
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
// .then((result) => app.listen(process.env.PORT || 3000))
// .catch((err) => console.log(err));

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => app.listen(3000))
//     .catch((err) => console.log(err));



//MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))
//for each route we use *


app.get('*', checkUser)

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
app.use('/blogs', requireAuth, blogRouter)

//for login and signup
app.use(authRouter)

//
app.use('/user', userRouter)






app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', { title: 'Not Found' });
});