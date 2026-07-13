import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import type { Genre } from "../types/movie";
import "./AppNavBar.scss";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  genres: Genre[];
  selectedGenre: number;
  setSelectedGenre: (id: number) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  favoritesCount: number;
  openFavorites: () => void;
};

export function AppNavBar({
  searchTerm,
  setSearchTerm,
  genres,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  favoritesCount,
  openFavorites,
}: Props) {
  return (
    <Navbar bg="light" fixed="top" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand>🎬 Movie App</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 ms-lg-auto w-100">

            <Form.Control
              type="search"
              placeholder="Search movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow-1"
            />

            <Form.Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(Number(e.target.value))}
              className="w-auto"
            >
              <option value={0}>All Genres</option>

              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-auto"
            >
              <option value="popularity.desc">Most Popular</option>
              <option value="vote_average.desc">Highest Rated</option>
              <option value="primary_release_date.desc">Newest</option>
            </Form.Select>

            <Button
              variant="outline-dark"
              onClick={openFavorites}
            >
              ❤️ Favorites ({favoritesCount})
            </Button>

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}