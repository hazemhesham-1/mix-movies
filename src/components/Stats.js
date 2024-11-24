const Stats = ({ movies, language }) => {
    function average(arr) {
        if(arr.length == 0) return 0;
        let sum = arr.reduce((total, num) => Number(total) + Number(num));
        return (sum / arr.length);
    }
    const avgUserRating = average(movies.map(movie => movie.userRating));
    const avgImdbRating = average(movies.map(movie => movie.imdbRating));
    const avgRunTime = average(movies.map(movie => movie.runTime));
    const numMovies = movies.length;
    return (
        <div className="stats">
            <h3>{language.text.watched}</h3>
            <div>
                <p>
                    <span>🎬</span>
                    <span style={language.isRTL ? { direction: 'rtl' } : {}}>{numMovies} {language.text.movies}</span>
                </p>
                <p>
                    <span>⭐</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⌛</span>
                    <span style={language.isRTL ? { direction: 'rtl' } : {}}>{Math.round(avgRunTime)} {language.text.minutes}</span>
                </p>
            </div>
        </div>
    );
}

export default Stats;