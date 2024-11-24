import { useEffect, useState } from "react";

const API_KEY = "50a82fb";

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
        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
          {signal: controller.signal}
        );
        if(!res.ok) throw new Error("Something went wrong !");
        const json = await res.json();
        
        if(json.Response === 'False') {
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
  
  return {movies, isLoading, error};
}