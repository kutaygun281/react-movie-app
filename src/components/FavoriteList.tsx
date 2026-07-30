import type { Movie } from "../types/movie"
import "./FavoriteList.scss";

type Props = {
    fav:Movie,
    handleRemove:(fav:Movie)=> void
};

export default function FavoriteList({fav, handleRemove}:Props){
    return (
        <div className="favoriteListContainer">
            <p>{fav.id}</p>
            <p>{fav.title}</p>
            <p>{fav.vote_average}</p>
            <button onClick={()=>handleRemove(fav)}>Delete favorite</button>
        </div>
    )
}