import "./MoviesDatabase.css";

// Interface defining the shape of each movie object
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

// Interface defining the shape of the props expected by the MoviesDatabase component
interface MoviesDatabaseProps {
  data: Movie[]; // An array of Movie objects
  error: string | null; // A string or null, representing any error message
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input change events
  searchTerm: string; // The current search term
}

// Functional component with explicit props type
export const MoviesDatabase: React.FC<MoviesDatabaseProps> = ({
  data,
  error,
  handleInputChange,
  searchTerm,
}) => {
  // Function to handle movie item click
  const handleMovieItemClick = (imdbID: string) => {
    window.open(`https://www.imdb.com/title/${imdbID}`, "_blank");
  };

  return (
    <div className="movie-database-container">
      <h1>🎥 Movie Database 🍿</h1>
      <h3>
        Fetching data from{" "}
        <a href="https://www.omdbapi.com/" target="_blank" className="link">
          OMDb
        </a>{" "}
        API{" "}
      </h3>
      <input
        type="text"
        value={searchTerm} // searchTerm is inferred as string
        onChange={handleInputChange} // handleInputChange has a defined type for event
        placeholder="Search for movies..."
        className="search-input"
      />
      {error && <p>{error}</p>} {/* error can be a string or null */}
      <div className="movie-list">
        {data.map(({ imdbID, Title, Year, Poster }) => {
          const poster = Poster !== "N/A" ? Poster : "./no-poster.svg";
          return (
            <div
              key={imdbID} // Each movie item requires a unique key
              className="movie-item"
              onClick={() => handleMovieItemClick(imdbID)}
            >
              <h2 className="title">{Title}</h2>
              <p>{Year}</p>
              <img src={poster} alt={Title} className="poster" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
