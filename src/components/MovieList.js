import MovieItem from "./MovieItem";

const MovieList = ({movies, onShowMovieDetails}) => {
    return (
        <ul>
            {movies.map((movie) => (
                <MovieItem
                    key={movie.imdbID}
                    movie={movie}
                    onShowMovieDetails={onShowMovieDetails}
                >
                    <p>📅 {movie.Year}</p>
                </MovieItem>
            ))}
        </ul>
    );
};

export default MovieList;