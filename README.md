# 🎬 React Movie App

A responsive movie discovery application built with **React**, **TypeScript**, **Vite**, **React Bootstrap**, **SCSS**, and the **TMDB API**.

Users can discover movies, search by title, filter by genre, sort results, view movie details, and manage their favorite movies with a modern responsive interface.

## 🚀 Live Demo

🔗  https://react-movie-app-cafz-9w53trzzi-kutu1.vercel.app/

---

## ✨ Features

* 🔍 Search movies by title
* 🎭 Filter movies by genre
* 📊 Sort movies by:

  * Most Popular
  * Highest Rated
  * Newest Releases
* 🎬 View detailed movie information
* ❤️ Add and remove favorite movies
* 📌 Favorite movies stored with Local Storage
* 🔔 Toast notifications for favorite actions
* 📱 Fully responsive design
* ⚡ Debounced search for optimized API requests
* 📄 Pagination support
* 🎨 Responsive navigation bar with Bootstrap

---

## 🛠️ Technologies Used

### Frontend

* React
* TypeScript
* Vite
* React Router
* React Bootstrap
* SCSS

### API

* TMDB API

### Testing

* Vitest
* React Testing Library
* Jest DOM

### Deployment

* Vercel

---

## 🧪 Testing

The application includes component and integration tests using **Vitest** and **React Testing Library**.

### Tested Components

* MovieCard
* AppNavBar
* MovieOffcanvas
* FavoritesOffcanvas
* FavoriteToast
* FavoriteList
* Home page

### Tested Scenarios

* Component rendering
* User interactions
* Button click events
* Favorite add/remove functionality
* Conditional rendering
* API response handling
* Loading states
* Error states
* Component props validation

---

## 📂 Project Structure

```
src
│
├── components
│   ├── AppNavBar.tsx
│   ├── MovieCard.tsx
│   ├── MovieOffcanvas.tsx
│   ├── FavoritesOffCanvas.tsx
│   └── FavoriteToast.tsx
│
├── pages
│   └── Home.tsx
│
├── types
│   └── movie.ts
│
├── test
│   └── setup.ts
│
└── main.tsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/kutaygun281/react-movie-app.git
```

Navigate to the project folder:

```bash
cd react-movie-app
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

You can get your API key from:

https://www.themoviedb.org/

---

## 📚 Learning Outcomes

Through this project, I practiced:

* Building scalable React components
* Working with TypeScript in React applications
* Consuming external APIs
* Managing component state with React Hooks
* Creating responsive layouts
* Using Local Storage for persistence
* Writing component tests
* Deploying a production React application

---

## 👨‍💻 Author

**Kutay Gün**

GitHub:
https://github.com/kutaygun281

```
```
