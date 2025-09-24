
const express =require('express');
const router= express.Router();
const campgrounds= require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const {islogin,isAuthor,validateCampground} = require('../middleware');
const Campground = require('../models/campground');
const multer =require('multer');
const {storage} =require('../cloudinary');
const upload= multer({storage});

router.get('/', catchAsync(campgrounds.index))
router.get('/new', islogin ,campgrounds.renderNewForm)

router.post('/',islogin,upload.array('image'), validateCampground,catchAsync(campgrounds.createCampground))
// router.post('/', ,(req,res) =>{
//     console.log(req.body,req.files);
//     res.send('hi it worked');
// })


router.get('/:id', catchAsync(campgrounds.showCampground))

router.get('/:id/edit',islogin,isAuthor ,catchAsync(campgrounds.renderEditForm));

router.put('/:id',islogin,isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground));


router.delete('/:id', islogin,isAuthor ,catchAsync(campgrounds.deleteCampground)) ;


module.exports =router;
