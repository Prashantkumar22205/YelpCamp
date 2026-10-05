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
