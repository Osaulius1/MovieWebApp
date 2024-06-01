import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../config';

function MoviePage() {
  const [data, setData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredData, setFilteredData] = useState([]); 
  const [sortByName, setSortByName] = useState(false); 
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        try {
          const sessionKey = localStorage.getItem('sessionKey');
          if (!sessionKey) {
            alert('Session key is missing. Please log in again.');
            setTimeout(() => history.push('/login'), 1000); 
            return;
          }

          const response = await fetch(`${config.backendUrl}/movies?sessionKey=${sessionKey}`);
          if (!response.ok) {
            if (response.status === 401) {
              alert('Session has expired. Please log in again.');
              setTimeout(() => history.push('/login'), 1000); 
              return;
            }
            throw new Error('Error fetching data');
          }

          const result = await response.json();
          setData(result);
          setFilteredData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
          alert('An error occurred while fetching data.');
        }
      }, 1000); 
    };

    fetchData();
  }, [history]);

  useEffect(() => {
    let filteredMovies = data.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortByName) {
      filteredMovies = filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredData(filteredMovies);
  }, [searchTerm, data, sortByName]);

  return (
    <div className="MoviePage">
      <h1 className="titleHeader">The movie website</h1>
      <div className="header">
        <p>
          Welcome to my website. Here you can find my favourite movies. You can read about them, sort
          them, etc. This is a non-profit website made purely for demonstration reasons. I used React
          and NestJS for fast code editing. The code was written in Neovim.
        </p>
      </div>
      <div className="controls">
        <div className="searchBox">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie..."
          />
        </div>
        <button
          className={`sortButton ${sortByName ? 'active' : ''}`}
          onClick={() => setSortByName(!sortByName)}
        >
          Sort by Name: {sortByName ? 'On' : 'Off'}
        </button>
      </div>
      <div className="expandedMovieList">
        {filteredData.length > 0 ? (
          filteredData.map((movie, index) => (
            <div key={index} className="expandedMovieBox">
              <img src={movie.posterUrl} alt="Movie poster" className="moviePoster" />
              <div className="movieTexts">
                <h1 className="expandedMovieTitle">{movie.title}</h1>
                <h4 className="expandedMovieAuthor">{movie.director}</h4>
                <h2 className="expandedMovieRating">{movie.rating}</h2>
                <p>{movie.description}</p>
                <a href={movie.imdbUrl}>Read more</a>
              </div>
            </div>
          ))
        ) : (
          <p>Loading movies...</p> 
        )}
      </div>
    </div>
  );
}

export default MoviePage;
