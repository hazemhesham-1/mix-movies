const MovieItem = ({movie, onShowMovieDetails, children}) => {
    return (
        <li onClick={() => onShowMovieDetails(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title}-poster`}/>
            <h3>{movie.Title}</h3>
            <div>{children}</div>
        </li>
    );
}

export default MovieItem;