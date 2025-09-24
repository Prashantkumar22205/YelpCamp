const express =require('express');
const router= express.Router({mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review =require('../models/review.js');
const reviews= require('../controllers/reviews.js')
const {validateReview,islogin,isReviewAuthor} = require('../middleware');


router.post('/',islogin, validateReview,catchAsync( reviews.createReview))

router.delete('/:reviewId',islogin,isReviewAuthor,catchAsync(reviews.deleteReview))


module.exports=router;