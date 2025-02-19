import { useState } from "react";
import { searchMovie, getRecommendations } from "../utils/API";
import SearchForm from "./SearchForm";

console.log(getRecommendations);
console.log(searchMovie);

function OmdbContainer() {
  const [search, setSearch] = useState<string>("");
  interface Movie {
    Title: string;
    Poster: string;
    Genre: string;
    MovieID: string;
  }

  const [movie, setMovie] = useState<Movie | null>(null);
  // State to store movie detail

  const handleFormSubmit = async (query: string) => {
    try {
      const result = await searchMovie(query);
      console.log("Fetched Data:", result);

      // if (result.data.Response === "True") {
      //   const movieData: Movie = {
      //     Title: result.data.results.title,
      //     Poster: result.data.results.poster_path,
      //     Genre: result.data.results.genre_ids,
      //     MovieID: result.data.results.id,
      //   };

      if (result.data.results.length > 0) {
        const movieDetails = result.data.results[0]; // Get first movie from search results

        const genreMap: { [key: number]: string } = {
          28: "Action",
          12: "Adventure",
          16: "Animation",
          35: "Comedy",
          80: "Crime",
          99: "Documentary",
          18: "Drama",
          10751: "Family",
          14: "Fantasy",
          36: "History",
          27: "Horror",
          10402: "Music",
          9648: "Mystery",
          10749: "Romance",
          878: "Science Fiction",
          10770: "TV Movie",
          53: "Thriller",
          10752: "War",
          37: "Western",
        };

        const movieData: Movie = {
          Title: movieDetails.title, // Title is correctly retrieved
          Poster: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`, // Construct full image URL
          Genre: movieDetails.genre_ids
            .map((id: number) => genreMap[id] || "Unknown")
            .join(", "), // Convert genre array to a string
          MovieID: movieDetails.id.toString(), // Store the movie ID
        };

        setMovie(movieData);
      } else {
        setMovie(null);
      }
    } catch (error) {
      console.error("Error fetching this movie", error);
      setMovie(null);
    }
  };

  /* Fall back to default header if `Title` is undefined
  Does `Title` exist? If so, render the `MovieDetail` card 
  If not, render a different header */

  return (
    <section>
      <div>
        <div>
          <h1>{movie?.Title || "Search for a Movie to Begin"}</h1>
          {movie ? (
            <div>
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Genre}</p>
            </div>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
        <div>
          <SearchForm
            search={search}
            setSearch={setSearch}
            onSearchSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </section>
  );
}

export default OmdbContainer;

//! Original code
// const OmdbContainer = () => {
//   // Set state for the search result and the search query
//   const [result, setResult] = useState({});
//   const [search, setSearch] = useState("");

//   // When the search form is submitted, use the API.search method to search for the movie(s)
//   const searchMovie = (query) =>
//     API.search(query)
//       .then((res) => {
//         setResult(res.data);
//         setSearch("");
//       })
//       .catch((err) => console.log(err));

//   // When the component loads, use the API.search method to render a default search result
//   // The empty optional array [] will cause the hook to only run one time after the component loads

//   // Handler for input changes to the search form
//   const handleInputChange = (e) => setSearch(e.target.value);

//   // Handler for what happens when the search form is submitted
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     searchMovie(search);
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(event.target.value);
//   };
// console.log(search)
// const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   //props.searchMovie(search);

//   const result = await searchMovie(search);
//   console.log("Fetched Data:", result.data);

// useEffect(() => {
//   searchMovie("Harry Potter");
// }, []);
