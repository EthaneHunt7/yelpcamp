const express =require('express');
const router = express.Router({mergeParams : true});
const catchAsync = require('../utils/CatchAsync')
const ExpressError =require('../utils/ExpressError')
const reviews=require('../controllers/reviews')
const {reviewSchema}=require('../schemas.js');
const Review = require('../models/review');
const Campground = require('../models/campground');
const {isLoggedIn, isReviewAuthor}=require('../middleware');


const validateReview= (req,res,next)=>{
   
    const {error} = reviewSchema.validate(req.body);
    if(error){
        console.log(error)
        const msg = error.details.map(el => el.message).join(',')
            throw new ExpressError(msg, 400)
    
    // const msg=error.details.map(el=>el.message).join(',');
    // throw new ExpressError(result.error.details,400)
}
else{
    next();
}
}

router.post("/",isLoggedIn,validateReview,catchAsync(reviews.createReview))



router.delete('/:reviewId',isReviewAuthor,isLoggedIn, catchAsync(reviews.deleteReview))

module.exports = router;