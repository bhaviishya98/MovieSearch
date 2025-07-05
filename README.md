# 🎬 MovieSearch

MovieSearch is a full-stack web application that allows users to search for movies, manage a watchlist, and export movie data to CSV. Built with the MERN stack, Firebase Auth, Redux Toolkit, and styled using Tailwind CSS + ShadCN UI.

## 🌐 Live Site
[Visit MovieSearch](https://movie-search-nine-ruby.vercel.app/)

## 🧰 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Framer Motion, ShadCN UI, Radix UI, Slick Carousel
- **State Management**: Redux Toolkit
- **Backend**: MongoDB, Mongoose, Firebase Auth
- **Export**: CSV export using `json2csv`
- **Hosting**: Vercel

## 📁 Project Structure Overview

```
/app
  /movies
    - [id].js          # Movie detail page
    - page.jsx         # Movie list/grid UI
  /watchlist           # Watchlist page
  /login               # Login/Signup logic
/components
  - MovieCard.jsx      # UI for each movie card
  - Navbar.jsx         # Top nav bar
  - ImgSlider.jsx      # Carousel component
/lib
  /features
    - movieSlice.js
    - userSlice.js
    - watchlistSlice.js
  - firebase.js        # Firebase auth setup
  - db.js              # Mongoose DB connect logic
  - exportMovies.js    # CSV exporting endpoint logic
```

## 🚀 Features

- 🔍 **Search & View Movies** – Browse movies with filters.
- ❤️ **Watchlist** – Save and remove movies to/from your personal watchlist.
- 👤 **Authentication** – Sign in with Firebase.
- 📤 **CSV Export** – Export movies with cast to `.csv`.

## 📦 API: Export Movies to CSV

You can export the movie list including cast and description to a `.csv` file by accessing the following endpoint:

```
GET https://movie-search-nine-ruby.vercel.app/api/exportMovies
```

The CSV contains the following fields:
- Movie name
- Description
- Cast (comma-separated names)
- Created At
- Updated At

## 📥 API: Import Movies from TMDB

You can bulk-import popular movies from TMDB into the database by specifying how many pages to fetch.

### 🔗 Endpoint
```
POST /api/importMovies
```

### 🧾 Request Body (JSON)

```json
{
  "pages": 3
}
```

This will import 3 pages of movies (usually 20 movies per page) with detailed cast and description info.

### 🧪 Sample cURL Request

```bash
curl -X POST https://movie-search-nine-ruby.vercel.app/api/importMovies \
  -H "Content-Type: application/json" \
  -d '{"pages": 3}'
```

### 📋 Response

```json
{
  "message": "60 movies imported successfully from 3 page(s).",
  "movies": [
    "Inception",
    "The Batman",
    "Dune",
    ...
  ]
}
```

## ⚙️ Setup

1. Clone the repo:
```bash
git clone https://github.com/your-username/movie-app.git
cd movie-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
# 🌐 TMDB API
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_TMDB_BEARER_TOKEN=your_tmdb_bearer_token

# 🛢️ MongoDB
MONGODB_URI=your_mongodb_connection_uri

# 🔥 Firebase Config
NEXT_PUBLIC_FIREBASE_FIREBASE_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

...
```

4. Run the development server:
```bash
npm run dev
```

---

Built with ❤️ by Bhavishya Gothwal