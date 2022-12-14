if(process.env.NODE_ENV!=='production')
{
    require('dotenv').config();
}
console.log(process.env.SECRET);

const express = require('express');
const app= express();
const path=require('path')
const mongoose =require('mongoose')
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/CatchAsync')
const ExpressError =require('./utils/ExpressError')
const joi = require ('joi')
const {campgroundSchema, reviewSchema}=require('./schemas.js');
const session = require('express-session');
const Review = require('./models/review');

const flash= require('connect-flash')
const passport = require('passport');
const localStrategy =require('passport-local')
const User = require('./models/user');

const campgroundRoutes =require('./routes/campgrounds');
const reviewRoutes =require('./routes/reviews');
const userRoutes =require('./routes/users');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate);

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))


const sessionConfig={
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
            expires: Date.now()+ 1000*60*60*24*7,
            maxAge: 1000*60*60*24*7
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{   
    console.log(req.session );
    res.locals.currentUser=req.user;
    res.locals.success= req.flash('success');
    res.locals.error= req.flash('error');
    next(); 
})


app.get('/', (req,res) =>{
    res.render("home")
})




app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)



app.all("*",(req,res,next)=>{
    next( new ExpressError('Page Not Found'),404)
})

app.use((err,req,res,next)=>{
   const{message='something went wrong',status=500}=err;
   if(!err.message){
       err.message="oh no! something went wrong."
   }
   res.status(status).render('error',{err})})

app.listen(3000,()=>{
    console.log('listening on port 3000')
})
