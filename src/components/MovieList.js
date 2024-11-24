import MovieItem from './MovieItem';

const MovieList = ({movies, onShowMovieDetails}) => {
    return (
        <ul>{movies.map(movie =>
            <MovieItem
                movie={movie}
                onShowMovieDetails={onShowMovieDetails}
                key={movie.imdbID}
            >
                <p>📅 {movie.Year}</p>
            </MovieItem>)}
        </ul>
    );
}

export default MovieList;