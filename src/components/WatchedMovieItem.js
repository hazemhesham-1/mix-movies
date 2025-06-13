import MovieItem from "./MovieItem";

const WatchedMovieItem = ({ movie, onShowMovieDetails, onRemove, language }) => {
    function handleClick(e) {
        e.stopPropagation();
        onRemove(movie.imdbID);
    }

    return (
        <MovieItem movie={movie} onShowMovieDetails={onShowMovieDetails}>
            <p>
                <span>⭐</span>
                <span>{movie.imdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
            </p>
            <p>
                <span>⌛</span>
                <span>{movie.runTime} {language.text.minutes}</span>
            </p>
            <button className="remove-btn" onClick={handleClick}>&times;</button>
        </MovieItem>
    );
};

export default WatchedMovieItem;