import { useEffect, useState } from "react";

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMoviesByQuery() {
            try {
                setIsLoading(true);
                setError("");

                // const res = await fetch(`?s=${query}&apikey=${API_KEY}`, { signal: controller.signal });
                const res = await fetch(`/api/data?search=${query}`, { signal: controller.signal });
                if(!res.ok) {
                    throw new Error("Something went wrong !");
                }

                const json = await res.json();

                if(json.Response === "False") {
                    setMovies([]);
                    throw new Error("No movies were found");
                }

                setMovies(json.Search);
            }
            catch(err) {
                if(err.name !== "AbortError") {
                    setError(err.message);
                }
            }
            finally {
                setIsLoading(false);
            }
        }
  
        if(query.length < 3) {
            setMovies([]);
            setError("");
            setIsLoading(!!query.length);

            return;
        }

        fetchMoviesByQuery();

        return () => { controller.abort(); };
    }, [query]);
    
    return { movies, isLoading, error };
}