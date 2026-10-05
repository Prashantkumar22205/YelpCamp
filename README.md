# 🏕️ YelpCamp

YelpCamp is a full-stack campground listing and review web application built with **Node.js, Express.js, MongoDB, and EJS**.

Users can create accounts, add and manage campgrounds, upload campground images, view locations on an interactive map, and leave reviews and ratings. The application also implements authentication, authorization, input validation, data sanitization, and secure session management.

---

## ✨ Features

### 👤 User Authentication

- User registration and login
- Logout functionality
- Passport.js authentication
- Password hashing using `passport-local-mongoose`
- Session-based authentication
- Persistent sessions using MongoDB
- Flash messages for authentication feedback

### 🏕️ Campground Management

- View all campgrounds
- View individual campground details
- Create new campgrounds
- Edit existing campgrounds
- Delete campgrounds
- Add campground descriptions, prices, locations, and images
- Upload images using Cloudinary
- Automatically geocode campground locations using MapTiler

### ⭐ Reviews & Ratings

- Add reviews to campgrounds
- Give ratings from 1 to 5
- Delete your own reviews
- Review author authorization
- Average rating display

### 🔐 Authorization & Security

- User authentication
- Campground owner authorization
- Review author authorization
- Joi-based server-side validation
- HTML sanitization using `sanitize-html`
- MongoDB query sanitization
- Helmet security headers
- Secure session configuration
- HTTP method override for PUT and DELETE requests

### 🗺️ Maps & Location

- Interactive campground maps
- MapTiler integration
- Forward geocoding of campground locations
- Display campground coordinates using GeoJSON

### 🗄️ Database

- MongoDB database
- Mongoose ODM
- Referenced relationships between:
  - Users
  - Campgrounds
  - Reviews
- Automatic cleanup of reviews when a campground is deleted

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- EJS
- EJS-Mate
- Bootstrap

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- Passport.js
- Passport Local
- Passport Local Mongoose
- Express Session
- Connect Mongo

### Cloud Services

- Cloudinary — image storage
- MapTiler — geocoding and maps

### Security & Validation

- Joi
- Helmet
- Sanitize HTML
- Express Mongo Sanitize

### Other Tools

- Multer
- Method Override
- Connect Flash
- Dotenv

---

## 🏗️ Architecture

YelpCamp follows a **Model-View-Controller (MVC)** architecture.

```text
                    ┌─────────────────────┐
                    │       Browser       │
                    │   EJS + Bootstrap   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Express.js      │
                    │       Routes        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Controllers      │
                    │  Business Logic     │
                    └───────┬─────┬───────┘
                            │     │
                 ┌──────────┘     └──────────┐
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │     Models      │         │ External APIs   │
        │    Mongoose     │         │ Cloudinary      │
        │    MongoDB      │         │ MapTiler        │
        └─────────────────┘         └─────────────────┘
```

---

## 📁 Project Structure

```text
YelpCamp/
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
├── views/
│   ├── campgrounds/
│   ├── users/
│   ├── layouts/
│   ├── partials/
│   └── error.ejs
│
├── public/
│   ├── javascripts/
│   └── stylesheets/
│
├── utils/
│   ├── catchAsync.js
│   └── ExpressError.js
│
├── seeds/
│   ├── cities.js
│   ├── index.js
│   └── seedHelpers.js
│
├── cloudinary/
│   └── index.js
│
├── middleware.js
├── schemas.js
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🗃️ Database Models

### User

Stores user authentication and account information.

```text
User
│
├── username
├── email
└── password
```

Authentication is handled using Passport Local and Passport Local Mongoose.

---

### Campground

Stores information about each campground.

```text
Campground
│
├── title
├── images
├── geometry
├── price
├── description
├── location
├── author
└── reviews
```

The `author` field references a User, while `reviews` contains references to Review documents.

---

### Review

Stores reviews and ratings for campgrounds.

```text
Review
│
├── body
├── rating
└── author
```

The `author` field references the User who created the review.

---

## 🔗 Relationships

```text
        ┌──────────────┐
        │     User     │
        └──────┬───────┘
               │
        creates│
               ▼
        ┌──────────────┐
        │  Campground  │
        └──────┬───────┘
               │
        contains│
               ▼
        ┌──────────────┐
        │    Review    │
        └──────┬───────┘
               │
        written│
               ▼
        ┌──────────────┐
        │     User     │
        └──────────────┘
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/YelpCamp.git
```

### 2. Navigate to the Project

```bash
cd YelpCamp
```

### 3. Install Dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
DB_URL=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

MAPTILER_API_KEY=your_maptiler_api_key
```

> Never commit your `.env` file or API credentials to GitHub.

---

## ▶️ Run the Application

Start the application using:

```bash
node app.js
```

The application will run locally at:

```text
http://localhost:3000
```

---

## 🌱 Database Seeding

The project contains a seed script for generating sample campground data.

Run:

```bash
node seeds/index.js
```

This creates sample campground records in the database.

---

## 🔐 Authentication Flow

```text
User
 │
 ▼
Register / Login
 │
 ▼
Passport.js
 │
 ▼
Session Created
 │
 ▼
MongoDB Session Store
 │
 ▼
Authenticated Requests
```

Protected routes check whether the user is authenticated before allowing actions such as creating, editing, or deleting campgrounds.

---

## 🛡️ Security

YelpCamp includes several security mechanisms:

- Password hashing with Passport Local Mongoose
- Session-based authentication
- Authorization middleware
- Joi input validation
- HTML sanitization
- MongoDB query sanitization
- Helmet security headers
- Protected campground operations
- Protected review deletion
- Environment variables for sensitive credentials

---

## 📡 Main Routes

### Authentication

| Method | Route | Description |
|---|---|---|
| GET | `/register` | Registration page |
| POST | `/register` | Create new user |
| GET | `/login` | Login page |
| POST | `/login` | Authenticate user |
| GET | `/logout` | Logout user |

### Campgrounds

| Method | Route | Description |
|---|---|---|
| GET | `/campgrounds` | Display all campgrounds |
| GET | `/campgrounds/new` | New campground form |
| POST | `/campgrounds` | Create campground |
| GET | `/campgrounds/:id` | Show campground |
| GET | `/campgrounds/:id/edit` | Edit campground |
| PUT | `/campgrounds/:id` | Update campground |
| DELETE | `/campgrounds/:id` | Delete campground |

### Reviews

| Method | Route | Description |
|---|---|---|
| POST | `/campgrounds/:id/reviews` | Create review |
| DELETE | `/campgrounds/:id/reviews/:reviewId` | Delete review |

---

## ☁️ Cloudinary Integration

Campground images are uploaded to Cloudinary instead of being stored directly on the application server.

```text
User
  │
  │ Upload Image
  ▼
Multer
  │
  ▼
Cloudinary
  │
  ▼
Image URL
  │
  ▼
MongoDB
```

The application stores the Cloudinary image information with the campground document.

---

## 🗺️ MapTiler Integration

When a campground is created, its location is converted into geographical coordinates using MapTiler geocoding.

```text
Campground Location
        │
        ▼
   MapTiler API
        │
        ▼
Latitude / Longitude
        │
        ▼
GeoJSON Geometry
        │
        ▼
Interactive Map
```

---

## 🧪 Validation

The application uses **Joi** for validating campground and review data before storing it in MongoDB.

This helps prevent invalid or incomplete data from reaching the database.

---

## 🧹 Data Sanitization

YelpCamp implements multiple layers of sanitization:

- `sanitize-html` for user-generated HTML content
- `express-mongo-sanitize` for MongoDB query protection
- Joi validation for incoming data
- Helmet for HTTP security headers

These measures help protect the application against common web vulnerabilities.

---

## 💡 Key Learning Outcomes

Through this project, I gained practical experience with:

- Building full-stack applications using Node.js and Express
- MVC architecture
- RESTful routing
- MongoDB database design
- Mongoose relationships and population
- Authentication using Passport.js
- Authorization middleware
- Session management
- Image upload and cloud storage
- API integration
- Geocoding and interactive maps
- Server-side validation
- Web application security
- EJS templating
- Error handling
- CRUD operations

---

## 🔮 Future Improvements

Possible improvements include:

- User profile management
- Advanced campground search
- Filtering by price and location
- Pagination
- Campground favorites/wishlist
- Improved map-based search
- Social login with Google
- Automated testing
- Admin dashboard
- Better image optimization
- Production deployment with CI/CD

---

## 📌 Project Status

**Status:** Completed / Academic & Portfolio Project

The project demonstrates a complete full-stack campground management and review platform with authentication, authorization, database relationships, image uploads, maps, validation, and security features.

---

## 👨‍💻 Author

**Prashant Kumar**

B.Tech Computer Science & Engineering

---

## ⭐ If You Like This Project

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.
