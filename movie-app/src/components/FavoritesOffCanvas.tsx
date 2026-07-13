import type { Movie } from "../types/movie";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button, ListGroup } from "react-bootstrap";
import "./FavoriteOffCanvas.scss";

type Props = {
    show: boolean;
    onHide: () => void;
    favorites: Movie[];
    removeFavorite: (movie: Movie) => void;
}

function FavoritesOffcanvas({ show, onHide, favorites, removeFavorite }: Props) {
    return (

        <>
            <Offcanvas show={show} onHide={onHide} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        ❤️ Favorite Movies ({favorites.length})
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {favorites.length === 0 ? (
                        <p>No favorite movies yet.</p>
                    ) : (
                        favorites.map((fav) => (
                            <ListGroup className="favoriteBox" key={fav.id}>
                                <img className="favoriteBoxImg"
                                    src={`https://image.tmdb.org/t/p/w200${fav.poster_path}`}
                                    alt={fav.title}
                                />
                                <h5>{fav.title}</h5>

                                <p>⭐ {fav.vote_average}</p>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => removeFavorite(fav)}
                                >
                                    Remove
                                </Button>

                            </ListGroup>
                        )))}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default FavoritesOffcanvas;
