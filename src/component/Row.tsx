import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Youtube from 'react-youtube'
// import movieTrailer from 'movie-trailer'
// import '../assets/styles/Row.css'

type Props = {
    title: string;
    fetchUrl: string;
    isLargeRow?: boolean;
};

type Movie = {
    id: string;
    name: string;
    title: string;
    original_name: string;
    poster_path: string;
    backdrop_path: string;
};

type Options = {
    height: string;
    width: string;
    playerVars: {
        autoplay: 0 | 1 | undefined;
    };
};

const Row = ({title, fetchUrl, isLargeRow}: Props) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [trailerUrl, setTrailerUrl] = useState<string | null>("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    console.log(movies);

    const opts: Options = {
        height:"390",
        width:"640",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = async (movie: Movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } else {
            const API_KEY = process.env.REACT_APP_TMDB_KEY;
            let trailerurl = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
            );
            console.log(movie.id);
            
            setTrailerUrl(trailerurl.data.results[0]?.key);
            console.log(trailerurl.data.results[0]?.key);
        }
    };

    const base_url = "https://image.tmdb.org/t/p/original";

    return (
        <div className="Row">
            <h2>{title}</h2>
            <div className="Row-posters">
                {/* ポスターコンテンツ */}
                {movies.map((movie, i) => (
                    <img
                        key={movie.id}
                        className={`Row-poster${isLargeRow && "Row-poster-large"}`}
                        src={`${base_url}${
                            isLargeRow? movie.poster_path : movie.backdrop_path
                        }`} 
                        alt={movie.name}
                        onClick={() => handleClick(movie)} />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;