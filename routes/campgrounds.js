const express =require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const ExpressError =require('../utils/ExpressError');
const campgrounds=require('../controllers/campgrounds');
const multer  = require('multer');
const{ storage }=require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');
const {campgroundSchema}=require('../schemas.js');
const { isLoggedIn, validateCampground } = require('../middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
    // .post(upload.array('image',2),(req,res)=>{console.log(req.body)
    //     console.log(req.files);
    // res.send("it worked!")});


 router.get('/new',isLoggedIn,campgrounds.renderNewForm);

router.route('/:id')
    .get( catchAsync(campgrounds.showCampground))
    .put( isLoggedIn,upload.array('image'),validateCampground,catchAsync(campgrounds.updateCampground))
    .delete( isLoggedIn,catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, catchAsync(campgrounds.renderEditForm))


module.exports = router;