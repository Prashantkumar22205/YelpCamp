
const mongoose = require('mongoose');
const Campground=require('../models/campground')
const cities=require('./cities');
const {places,descriptors}= require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB=async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000= Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp =new Campground({
            author:'68b08b3c4be7cd8ef74a8ad4',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
        title:`${sample(descriptors)} ${sample(places)}`,
       
         description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui adipisci non delectus itaque natus exercitationem laborum rem, eaque minus temporibus officia praesentium maiores. Praesentium aut voluptas fuga excepturi unde molestiae!',
         price,
         geometry:{
            type:"Point",
            coordinates:[-
                 cities[random1000].longitude,
                 cities[random1000].latitude,
            ]
         },
         images: [
    {
      url: 'https://res.cloudinary.com/dpgsiu9jg/image/upload/v1757247713/YelpCamp/hx4vostj9hm4o9kwdcjk.png',
      filename: 'YelpCamp/hx4vostj9hm4o9kwdcjk',
     
    },
     {
      url: 'https://res.cloudinary.com/dpgsiu9jg/image/upload/v1757247824/YelpCamp/bqxwxeccnzrbjcbomec0.jpg',
      filename: 'YelpCamp/bqxwxeccnzrbjcbomec0',
    
    }

  ]

        });
        await camp.save();

    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})
