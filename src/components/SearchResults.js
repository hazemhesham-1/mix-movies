const SearchResults = ({ movies, language }) => {
  return (
    <p>{language.text.found} {movies.length} {language.text.results}</p>
  );
}

export default SearchResults;