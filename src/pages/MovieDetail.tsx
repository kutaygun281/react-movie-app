import { useParams } from "react-router-dom";
import { useEffect } from "react";
import type{ TmdbMoviedetailed } from "../types/movie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieDetail() {
    const {id} =useParams();
    const [loading,setLoading] =useState<boolean>(false);
    const [error,setError] =useState<string>("");
    const [movieDetailed,setMovieDetailed] = useState<TmdbMoviedetailed>();
    const navigate =useNavigate();
       
        useEffect(()=>{
            
            async function getMovieDetails() {
                try{
                setLoading(true);
                const API_key = import.meta.env.VITE_TMDB_API_KEY;
                const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
                const getData = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_key}&language=tr-TR`);
                const details:TmdbMoviedetailed = await getData.json();    
                
                setMovieDetailed(details);
            }
            catch(err){
        setError("Something happened");
    }
    finally{
        setLoading(false);
    }
        
    }
   
         getMovieDetails();

     },[id])

    return (
        <>
        <h1>Movie Detail</h1>
            {loading && <h3>Loading...</h3>}
            {error && <h3>Something happened</h3>}
            <p>{movieDetailed?.id}</p>
            <p>{movieDetailed?.title}</p>
            <p>{movieDetailed?.vote_average}</p>
            <p>{movieDetailed?.overview}</p>
            <button onClick={()=>navigate(-1)}>Back</button>
        </>
    );
}

export default MovieDetail;