export interface Movie{
    id:number,
    title:string,
    vote_average:number;
    poster_path: string;
    overview:string;
};

export interface TmdbMovie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview:string;
}

export interface TmdbResponse {
  results: TmdbMovie[];
  total_pages: number;
}

export interface TmdbMoviedetailed {
  id: number;
  title: string;
  vote_average: number;
  overview:string;
  poster_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse{
  genres:Genre[];
}