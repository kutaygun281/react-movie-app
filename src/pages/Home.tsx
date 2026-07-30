import './Home.scss';
import { MovieCard } from '../components/MovieCard';
import { useState } from 'react';
import type { Movie } from '../types/movie';
import { useEffect } from "react";
import type { TmdbResponse } from '../types/movie';
import MovieOffcanvas from "../components/MovieOffcanvas";
import { Spinner } from 'react-bootstrap';
import type { Genre } from '../types/movie';
import type { GenreResponse } from '../types/movie';
import { AppNavBar } from '../components/AppNavBar';
import FavoritesOffcanvas from '../components/FavoritesOffCanvas';
import AddedToFavorite from '../components/FavoriteToast';

function Home() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    }

    return [];
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, settotalPages] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [selectedMovie, setselectedMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


  useEffect(() => {

    async function getMovies() {
      try {
        setLoading(true);

        const API_key = import.meta.env.VITE_TMDB_API_KEY;
        const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
        let url = "";
        if (debouncedSearch !== "") {
          url = `/search/movie?api_key=${API_key}&language=us-US&query=${debouncedSearch}&page=${page}`;
        }
        else if (selectedGenre === 0) {
          url = `/discover/movie?api_key=${API_key}&language=us-US&page=${page}&sort_by=${sortBy}`;
        }
        else {
          url = `/discover/movie?api_key=${API_key}&language=us-US&page=${page}&with_genres=${selectedGenre}&sort_by=${sortBy}`;
        }
        const getResponse = await fetch(`${BASE_URL}${url}`);
        const response: TmdbResponse = await getResponse.json();
        const convertedMovies: Movie[] = response.results.map((e) => {
          return {
            id: e.id,
            title: e.title,
            vote_average: e.vote_average,
            poster_path: e.poster_path,
            overview: e.overview
          };
        });

        setMovieList(convertedMovies);
        settotalPages(response.total_pages);
      }
      catch (err) {
        setError("Something happened");
      }
      finally {
        setLoading(false);
      }
    }
    getMovies();

  }, [page, selectedGenre, sortBy, debouncedSearch])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);

    }, 500);

    return () => {
      clearTimeout(timer);
    };

  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    async function getGenres() {
      const API_key = import.meta.env.VITE_TMDB_API_KEY;
      const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
      const data = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_key}&language=us-US`)
      const response: GenreResponse = await data.json();
      setGenres(response.genres);

    }
    getGenres();
  }, []);


  function getDetails(movie: Movie) {
    setselectedMovie(movie);
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function addToFavorite(movie: Movie) {

    if (favorites.some((e) => e.id === movie.id)) {
      return;
    }
    const newFavorites = [...favorites, movie]
    setFavorites(newFavorites);
    setToastMessage(`${movie.title} added to favorites.`);
    setShowToast(true);
  }

  function removeLastMovie() {
    const liste: Movie[] = [...movieList];
    liste.pop();
    setMovieList(liste);
  }

  function removeFavorite(fav: Movie) {

    const updatedFavorites: Movie[] = favorites.filter((e) => e.id !== fav.id);
    setFavorites(updatedFavorites);
  }

  const newList: Movie[] = movieList.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function BasicExample() {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <div>
        <div>
          {loading &&
            <h1>Loading...{BasicExample()}</h1>}

          {error &&
            <h1>{error}</h1>}

          <div className='Appbar'>
            <AppNavBar searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              genres={genres}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              sortBy={sortBy}
              setSortBy={setSortBy}
              openFavorites={() => setShowFavorites(true)}
              favoritesCount={favorites.length}
            ></AppNavBar>
          </div>
          <div className="row g-3">
            {newList.map((mov) => (
              <div
                key={mov.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <MovieCard
                  mov={mov}
                  handleClick={addToFavorite}
                  handleDetail={getDetails}
                />
              </div>
            ))}
          </div>
        </div>
        <MovieOffcanvas
          show={show}
          selectedMovie={selectedMovie}
          onHide={handleClose}
          addToFavorite={addToFavorite}
        />
        <FavoritesOffcanvas
          show={showFavorites}
          onHide={() => setShowFavorites(false)}
          favorites={favorites}
          removeFavorite={removeFavorite}
        ></FavoritesOffcanvas>
        <div>
          <button onClick={removeLastMovie}>Son filmi sil</button>
        </div>
        <div>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {page} / {totalPages} </span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
        <AddedToFavorite show={showToast} message={toastMessage} onClose={() => setShowToast(false)}></AddedToFavorite>
      </div>

    </>
  )
}

export default Home
