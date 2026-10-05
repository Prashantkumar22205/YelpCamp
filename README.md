YelpCamp 🏕️
A full-stack campground discovery and review web application built with Node.js, Express, MongoDB, Mongoose, and EJS.
YelpCamp allows users to discover campgrounds, view their locations on an interactive map, create their own campground listings, upload campground images, leave reviews, and manage content they own.
The project follows a server-rendered MVC-style architecture and includes authentication, authorization, image uploads, geocoding, input validation, security middleware, and MongoDB-backed sessions.
✨ Features
- 🔐 User registration, login, and logout
- 👤 Persistent authentication using Passport.js
- 🏕️ Browse all campgrounds
- 🔎 View detailed campground information
- ➕ Create new campground listings
- ✏️ Edit campgrounds owned by the logged-in user
- 🗑️ Delete campgrounds owned by the logged-in user
- 📷 Upload multiple campground images
- ☁️ Store images using Cloudinary
- 🗺️ Convert campground locations into map coordinates using MapTiler
- 📍 Display campground locations on interactive maps
- ⭐ Add campground reviews with ratings
- 🗑️ Delete reviews created by the logged-in user
- 🛡️ Joi-based server-side validation
- 🧹 HTML sanitization to reduce XSS risks
- 🛡️ MongoDB query sanitization
- 🔒 Helmet security headers and Content Security Policy
- 💬 Flash messages for success/error feedback
- 💾 MongoDB-backed session storage
- 🌱 Database seeding with sample campground data
- 📱 Responsive server-rendered UI
🛠️ Tech Stack
Backend
- Node.js 20.15.1
- Express 5
- MongoDB
- Mongoose
- Passport.js
- Passport Local
- Passport Local Mongoose
Frontend
- EJS
- EJS-Mate
- HTML5
- CSS3
- JavaScript
- Bootstrap / external UI resources
APIs & Services
- Cloudinary — image storage and management
- MapTiler — geocoding and map data
Security & Validation
- Helmet
- Joi
- sanitize-html
- express-mongo-sanitize
- HTTP-only sessions
🏗️ Architecture
YelpCamp uses a controller-based MVC architecture:
                         ┌──────────────────┐
                         │      Browser     │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  Express Routes  │
                         └────────┬─────────┘
                                  │
                   ┌──────────────┼──────────────┐
                   ▼              ▼              ▼
              Middleware     Controllers      Passport
                   │              │              │
                   │              ▼              │
                   │          Mongoose           │
                   │              │              │
                   └──────────────┼──────────────┘
                                  ▼
                         ┌──────────────────┐
                         │     MongoDB      │
                         └──────────────────┘

External Services
       │
       ├── Cloudinary → Image storage
       └── MapTiler   → Geocoding / maps
📁 Project Structure
YelpCamp/
├── app.js
├── package.json
├── package-lock.json
├── middleware.js
├── schemas.js
│
├── controllers/
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── campground.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── campgrounds.js
│   ├── reviews.js
│   └── user.js
│
├── cloudinary/
│   └── index.js
│
├── seeds/
│   ├── cities.js
│   ├── index.js
│   └── seedHelpers.js
│
├── utils/
│   ├── catchAsync.js
│   ├── ExpressError.js
│   └── mongoSanitizeV5.js
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── partials/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── campgrounds/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── show.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── home.ejs
│   └── error.ejs
│
└── public/
    ├── javascripts/
    │   ├── clusterMap.js
    │   ├── showPageMap.js
    │   └── validateForm.js
    └── stylesheet/
        ├── app.css
        ├── home.css
        └── star.css
🏕️ Core Functionality
1. User Authentication
YelpCamp uses Passport.js with Passport Local Mongoose for authentication.
Registration Flow
User submits registration form
          ↓
Express route
          ↓
User controller
          ↓
Passport Local Mongoose
          ↓
Password hashing
          ↓
User stored in MongoDB
          ↓
Automatic login
          ↓
Redirect to campgrounds
User information is stored in the User collection.
The model contains:
email
username
hashed password
authentication metadata
Passwords are handled by passport-local-mongoose rather than being stored directly.
Login Flow
Login form
    ↓
Passport Local Strategy
    ↓
Credentials verified
    ↓
Session created
    ↓
Authenticated user available as req.user
🏕️ Campground Management
Authenticated users can create campground listings.
A campground contains:
- Title
- Price
- Location
- Description
- Images
- Geographic coordinates
- Author
- Reviews
Example data structure:
Campground
│
├── title
├── price
├── location
├── description
├── images[]
├── geometry
│   ├── type
│   └── coordinates[]
├── author → User
└── reviews[] → Review
Create Campground
When a user submits a campground:
Campground form
      ↓
Joi validation
      ↓
Image upload
      ↓
Cloudinary
      ↓
Location sent to MapTiler
      ↓
Geographic coordinates generated
      ↓
Campground saved to MongoDB
☁️ Image Uploads
Campground images are uploaded through Multer and stored in Cloudinary.
Browser
   ↓
Multer
   ↓
Cloudinary Storage
   ↓
Cloudinary
   ↓
Image URL + filename
   ↓
MongoDB Campground document
The application supports multiple image uploads for a campground.
Cloudinary is also used when deleting previously uploaded images.
🗺️ Location & Maps
YelpCamp uses MapTiler for geocoding.
When a campground location is entered:
"Manali, Himachal Pradesh"
          ↓
      MapTiler
          ↓
Latitude + Longitude
          ↓
Campground.geometry
The geographic data is stored as:
{
  "type": "Point",
  "coordinates": [longitude, latitude]
}
The project includes:
- Cluster map for multiple campgrounds
- Individual campground map
- Map markers
- Popup information
Frontend map-related JavaScript:
public/javascripts/clusterMap.js
public/javascripts/showPageMap.js
⭐ Reviews & Ratings
Authenticated users can add reviews to campgrounds.
Each review contains:
rating
body
author
Ratings are restricted to:
1 → 5
Review Flow
User submits review
        ↓
Authentication check
        ↓
Joi validation
        ↓
Review created
        ↓
Review linked to campground
        ↓
Redirect to campground page
When a campground is deleted, its associated reviews are also deleted through a Mongoose middleware hook.
🔐 Authorization
Authentication and authorization are handled separately.
Authentication
Checks whether the user is logged in:
islogin
Campground Authorization
Checks whether the logged-in user owns the campground:
isAuthor
Review Authorization
Checks whether the logged-in user owns the review:
isReviewAuthor
This prevents users from modifying or deleting resources owned by other users.
🛡️ Validation & Security
Security is an important part of the application.
Joi Validation
Campground and review requests are validated using Joi.
Campground validation includes:
title       → required
price       → required, >= 0
location    → required
description → required
Review validation includes:
rating → required, 1–5
body   → required
Invalid requests return a 400 error.
HTML Sanitization
User-provided text is processed through sanitize-html.
The project extends Joi with an escapeHTML() rule to prevent HTML from being injected into user-controlled fields.
User input
    ↓
Joi validation
    ↓
HTML sanitization
    ↓
Clean data
    ↓
MongoDB
MongoDB Query Sanitization
MongoDB sanitization middleware is used to reduce the risk of malicious MongoDB operators being injected into request data.
Helmet
Helmet is configured to add security-related HTTP headers.
The project also defines a Content Security Policy for:
- Scripts
- Styles
- Images
- Fonts
- MapTiler connections
- External resources
💾 Sessions
User sessions are stored in MongoDB using:
connect-mongo
Instead of storing session information only in server memory:
Browser
   ↓
Session Cookie
   ↓
MongoDB Session Store
The session cookie is configured as HTTP-only.
Sessions are retained for approximately 7 days according to the current application configuration.
💬 Flash Messages
The application uses connect-flash to provide user feedback.
Examples:
Successfully made a new campground
Successfully Updated!
Successfully Deleted!
New Review Added
Welcome back!
Goodbye!
These messages are displayed through the shared flash partial.
🧩 Middleware
Important middleware includes:
Middleware	Purpose
islogin	Requires authentication
storeReturnTo	Remembers requested URL before login
isAuthor	Ensures campground ownership
isReviewAuthor	Ensures review ownership
validateCampground	Validates campground input
validateReview	Validates review input
catchAsync	Handles async controller errors
mongoSanitize	Sanitizes MongoDB input
Helmet	Adds security headers


🔗 API / Route Reference
The project is primarily server-rendered, so routes return EJS pages and redirects rather than acting as a traditional JSON REST API.
Authentication Routes
Method	Route	Description
GET	/register	Registration page
POST	/register	Create user
GET	/login	Login page
POST	/login	Authenticate user
GET	/logout	Logout user


Campground Routes
Method	Route	Description	Auth
GET	/campgrounds	List all campgrounds	No
GET	/campgrounds/new	New campground form	Yes
POST	/campgrounds	Create campground	Yes
GET	/campgrounds/:id	View campground	No
GET	/campgrounds/:id/edit	Edit form	Owner
PUT	/campgrounds/:id	Update campground	Owner
DELETE	/campgrounds/:id	Delete campground	Owner


Review Routes
Method	Route	Description	Auth
POST	/campgrounds/:id/reviews	Add review	Yes
DELETE	/campgrounds/:id/reviews/:reviewId	Delete review	Review owner


🗃️ Database Models
User
User
├── username
├── email
└── authentication data
Authentication data is managed by Passport Local Mongoose.
Campground
Campground
├── title
├── images[]
├── geometry
├── price
├── description
├── location
├── author → User
└── reviews[] → Review
Review
Review
├── body
├── rating
└── author → User
Relationships:
User
 │
 ├──────────────► Campground
 │                    │
 │                    └──────────► Reviews
 │                                      │
 └──────────────────────────────────────┘
🌱 Database Seeding
The project contains a seed script for generating sample campground data.
Seed-related files:
seeds/
├── index.js
├── cities.js
└── seedHelpers.js
The seed script generates multiple sample campgrounds using:
- Random cities
- Random campground names
- Random prices
- Sample descriptions
- Sample Cloudinary images
- Geographic coordinates
Run the seed script with:
node seeds/index.js
The seed script currently connects to the local MongoDB database yelp-camp. Make sure MongoDB is running locally before executing it.

⚙️ Environment Variables
Create a .env file in the project root.
Example:
DB_URL=mongodb://127.0.0.1:27017/yelp-camp

MAPTILER_API_KEY=your_maptiler_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
If deploying to a cloud platform, configure these values through the platform's environment-variable settings.
⚠️ Never commit secrets
Do not commit:
.env
Cloudinary API secrets
MapTiler API keys
Database credentials
Session secrets
Use .gitignore to exclude sensitive configuration.
🚀 Installation
1. Clone the repository
git clone <your-repository-url>
cd YelpCamp
2. Install dependencies
npm install
3. Start MongoDB
For a local MongoDB installation, make sure MongoDB is running.
The default local database is:
mongodb://127.0.0.1:27017/yelp-camp
Alternatively, provide a MongoDB Atlas connection string through DB_URL.
4. Configure environment variables
Create:
.env
and add your database, MapTiler, and Cloudinary credentials.
5. Start the application
node app.js
The application runs on:
http://localhost:3000
🧪 Testing the Application
A typical user flow is:
Open YelpCamp
      ↓
Register
      ↓
Login
      ↓
Browse campgrounds
      ↓
Open campground
      ↓
View map + images + reviews
      ↓
Create campground
      ↓
Upload images
      ↓
Edit campground
      ↓
Add review
      ↓
Delete review
      ↓
Delete campground
The current package.json does not define an automated test suite.
🔄 Request Lifecycle
A typical campground creation request passes through:
Browser
   │
   ▼
Express Route
   │
   ▼
Authentication Middleware
   │
   ▼
Multer / Cloudinary Upload
   │
   ▼
Joi Validation
   │
   ▼
Campground Controller
   │
   ├── MapTiler Geocoding
   │
   └── Mongoose
           │
           ▼
        MongoDB
           │
           ▼
       EJS Response
🎯 Project Objectives
YelpCamp was developed to demonstrate practical full-stack web development concepts:
- MVC architecture
- Server-side rendering
- RESTful routing concepts
- Authentication
- Authorization
- Database relationships
- CRUD operations
- Image uploads
- Cloud storage
- Geospatial data
- Third-party API integration
- Form validation
- Security middleware
- MongoDB sessions
- Error handling
🚧 Future Improvements
Possible improvements include:
- Add campground search and filtering
- Add pagination
- Add campground categories/tags
- Add average rating calculations
- Add user profile pages
- Add favorites / saved campgrounds
- Add richer review sorting
- Add automated unit and integration tests
- Add API documentation
- Add Docker support
- Improve production cookie/security configuration
- Add centralized logging
- Add stronger geospatial querying
- Add rate limiting
- Add image optimization and upload limits
- Add production deployment configuration
- Improve error handling for missing MapTiler geocoding results
📌 Security Notes
Before deploying the project publicly, review and replace development-oriented secrets/configuration.
In particular:
- Use strong, environment-based session secrets.
- Enable secure cookies over HTTPS.
- Keep Cloudinary credentials outside the repository.
- Keep MapTiler API keys outside the repository.
- Use a secure production MongoDB connection string.
- Review Content Security Policy settings for the deployed domain.
- Add upload size/type restrictions as required.
- Add rate limiting for authentication routes.
👨‍💻 Author
Prashant Kumar
A full-stack web development project demonstrating authentication, authorization, CRUD operations, MongoDB relationships, cloud image storage, geolocation, reviews, and security practices.
⭐ Project Highlights
🏕️ Campground Management
🔐 Authentication & Authorization
⭐ Reviews & Ratings
☁️ Cloudinary Image Uploads
🗺️ MapTiler Geocoding
🍃 MongoDB + Mongoose
🛡️ Joi + Helmet + Sanitization
💾 MongoDB Session Storage
🎨 EJS Server-Side Rendering
⭐ If you find this project useful, consider giving the repository a star.
