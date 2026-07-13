import Offcanvas from 'react-bootstrap/Offcanvas';
import type { Movie } from '../types/movie';

type Props = {
    show: boolean;
    selectedMovie: Movie | null;
    onHide: () => void;
    addToFavorite: (movie: Movie) => void;
}

function MovieOffcanvas({
    show,
    selectedMovie,
    onHide,
    addToFavorite
}: Props) {

    return (
        <>
            <Offcanvas show={show} onHide={onHide} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{selectedMovie?.title}</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${selectedMovie?.poster_path}`}
                        alt={selectedMovie?.title}
                        
                    />

                    <h4>{selectedMovie?.title}</h4>
                    <p>{selectedMovie?.overview}</p>

                    <p>⭐ {selectedMovie?.vote_average}</p>

                    <button
                        onClick={() => {
                            if (selectedMovie) {
                                addToFavorite(selectedMovie);
                            }
                        }}
                    >
                        Add to Favorites
                    </button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default MovieOffcanvas;