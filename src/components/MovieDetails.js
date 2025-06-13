import { useEffect, useRef, useState } from "react";
import { useKey } from "../hooks/useKey";
import RatingBox from "./RatingBox";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const MovieDetails = ({ id, watched, onAddMovie, onClose, language}) => {
    const [movie, setMovie] = useState({});
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const countRef = useRef(0);
    
    useKey("Escape", onClose);

    const watchedMovieRating = watched.find(movie => id == movie.imdbID)?.userRating;

    useEffect(() => {
        async function fetchMovieById() {
            try {
                setIsLoading(true);
                setError("");

                // const res = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
                const res = await fetch(`/api/data?id=${id}`);
                if(!res.ok) {
                    throw new Error("Something went wrong !");
                }

                const json = await res.json();

                setMovie({ ...json, userRating: watchedMovieRating });
                setRating(watchedMovieRating);
            }
            catch(err) {
                setError(err.message);
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchMovieById();
    }, []);

    useEffect(() => {
        if(!movie.Title) return;
        document.title = `${language.code != "en" ? language.text.movie : "Movie"} | ${movie.Title}`;

        return () => { document.title = language.text.title; };
    }, [movie, language]);

    useEffect(() => {
        if(rating === 0) return;

        countRef.current++;
    }, [rating]);
    
    function handleAddMovie(movie) {
        const newMovie = {
            imdbID: movie.imdbID,
            Title: movie.Title,
            runTime: parseInt(movie.Runtime, 10),
            imdbRating: movie.imdbRating,
            Poster: movie.Poster,
            userRating: rating,
            countRatings: countRef.current,
        };
        onAddMovie(newMovie);
        onClose();
    }

    return (
        <>
            {isLoading && <Loader language={language}/>}
            {!isLoading && error && <ErrorMessage error={error} language={language}/>}
            {!isLoading && !error && (
                <div className="details">
                    <button className="back-btn" onClick={onClose}>
                        <i className="fa fa-arrow-left"></i>
                    </button>
                    <header>
                        <img src={movie.Poster} alt={`${movie.Title}-poster`} />
                        <div>
                            <h2>{movie.Title}</h2>
                            <p>{movie.Released} • {movie.Runtime}</p>
                            <p>{movie.Genre}</p>
                            <p>
                                <span>⭐</span>
                                <span>{movie.imdbRating} IMDb rating</span>
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating-box">
                            <RatingBox
                                userRating={rating}
                                onSetRating={setRating}
                                maxRating={10}
                                size={22}
                            />
                            {!!watchedMovieRating && (
                                <p className={language.isRTL? "rtl" : ""}>
                                    <strong>{language.text.alreadyWatched}</strong>
                                </p>
                            )}
                            {!watchedMovieRating && !!rating && (
                                <button
                                    className="add-btn"
                                    onClick={() => handleAddMovie(movie)}
                                >
                                    {language.text.add}
                                </button>
                            )}
                        </div>
                        <p>{movie.Plot}</p>
                        <p>Starring {movie.Actors}</p>
                        <p>Directed by {movie.Director}</p>
                    </section>
                </div>
            )}
        </>
    );
};

export default MovieDetails;