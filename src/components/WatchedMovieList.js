import WatchedMovieItem from './WatchedMovieItem';

const WatchedMovieList = ({movies, onShowMovieDetails, onRemoveMovie, language}) => {
    return (
        <ul>{movies.map(movie =>
            <WatchedMovieItem
                key={movie.imdbID}
                movie={movie}
                onShowMovieDetails={onShowMovieDetails}
                onRemove={onRemoveMovie}
                language={language}
            />)}
        </ul>
    );
}

export default WatchedMovieList;