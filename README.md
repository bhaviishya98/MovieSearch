# 🎬 MovieSearch

MovieSearch is a full-stack web application that allows users to search for movies, manage a watchlist, and export movie data to CSV. Built with the MERN stack, Firebase Auth, Redux Toolkit, and styled using Tailwind CSS + ShadCN UI.

## 🌐 Live Site
[Visit MovieSearch](https://movie-search-steel-chi.vercel.app)

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
GET https://movie-search-steel-chi.vercel.app/api/exportMovies
```

The CSV contains the following fields:
- Movie name
- Description
- Cast (comma-separated names)
- Created At
- Updated At

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
MONGODB_URI=your-mongodb-uri
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
...
```

4. Run the development server:
```bash
npm run dev
```

---

Built with ❤️ by Bhavishya Gothwal