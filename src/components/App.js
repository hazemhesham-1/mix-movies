import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { useSessionStorageState } from "../hooks/useSessionStorageState";
import SearchResults from "./SearchResults";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import ListBox from "./ListBox";
import Stats from "./Stats";
import MovieList from "./MovieList";
import WatchedMovieList from "./WatchedMovieList";
import Main from "./Main";
import Footer from "./Footer";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";

const langData = {
    English: {
        title: "Mix Movies",
        search: "Search movies...",
        found: "Found",
        results: "results",
        movies: "movies",
        watched: "Movies you watched",
        add: "+ Add to watch list",
        alreadyWatched: "You watched this movie",
        minutes: "min",
        loading: "loading",
    },
    Arabic: {
        title: "ميكس سينما",
        search: "بحث أفلام...",
        found: "تم العثور على",
        results: "نتائج",
        movie: "فيلم",
        movies: "أفلام",
        watched: "أفلام شاهدتها",
        add: "+ أضف إلى القائمة",
        alreadyWatched: "لقد شاهدت هذا الفيلم",
        minutes: "دقيقة",
        loading: "برجاء الانتظار",
        error: "لم يتم العثور علي نتائج",
    },
};

const defaultLanguage = {
    text: langData.English,
    code: "en",
    isRTL: false,
};

function App() {
    const [query, setQuery] = useState("");
    const { movies, isLoading, error } = useMovies(query);
    const [watched, setWatched] = useSessionStorageState([], "watchedMovies");
    const [selectedId, setSelectedId] = useState("");
    const [language, setLanguage] = useState(defaultLanguage);

    function handleChangeLanguage(code) {
        if (code == "en") {
            setLanguage({ text: langData.English, code, isRTL: false });
        }
		else if (code == "ar") {
			setLanguage({ text: langData.Arabic, code, isRTL: true });
        }
    }

    function handleAddMovie(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleRemoveMovie(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID != id));
    }

    return (
        <div className="app">
			<Navigation language={language}>
                <SearchBar
                    query={query}
                    onChangeQuery={setQuery}
                    language={language}
                />
                <SearchResults movies={movies} language={language}/>
            </Navigation>

            <Main>
                <ListBox language={language}>
                    {isLoading && <Loader language={language}/>}
                    {!isLoading && error && (
                        <ErrorMessage error={error} language={language}/>
                    )}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onShowMovieDetails={setSelectedId}
                        />
                    )}
                </ListBox>

                {!selectedId ? (
                    <ListBox language={language}>
                        <Stats movies={watched} language={language}/>
                        <WatchedMovieList
                            movies={watched}
                            onRemoveMovie={handleRemoveMovie}
                            onShowMovieDetails={setSelectedId}
                            language={language}
                        />
                    </ListBox>
                ) : (
                    <ListBox language={language}>
                        <MovieDetails
                            key={selectedId}
                            id={selectedId}
                            watched={watched}
                            onAddMovie={handleAddMovie}
                            onClose={() => setSelectedId(null)}
                            language={language}
                        />
                    </ListBox>
                )}
            </Main>
            <Footer
                language={language}
                onChangeLanguage={handleChangeLanguage}
            />
        </div>
    );
}

export default App;