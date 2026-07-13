import type { Movie } from "../types/movie";
import "./MovieCard.scss";
import { useNavigate } from "react-router-dom";

type Props={
    mov:Movie,
    handleClick:(movie:Movie) => void,
    handleDetail: (movie: Movie) => void;
}

export function MovieCard({mov, handleClick, handleDetail}:Props){

    const navigate =useNavigate();

    return (
        <div className="movieCardContainer">
            <p>{mov.id}</p>
            <p>{mov.title}</p>
            <p>{mov.vote_average}</p>
            <img src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`} alt={mov.title}/>
            <button onClick={()=>handleClick(mov)}>Add to favorite</button>
            <button onClick={()=>handleDetail(mov)}>Details</button>
        </div>
    )
}