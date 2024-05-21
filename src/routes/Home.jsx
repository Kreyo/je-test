import React, { useState } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import Details from './Details.jsx';

const API_KEY = import.meta.env.VITE_OMDB_KEY;

function App() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);

  const handleSearch = async (query) => {
    setIsNothingFound(false)
    try {
      setIsSearching(true)
      navigate("/", { replace: false });
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      if (response.data.Search) {
        setSearchResults(response.data.Search);
        updateSearchHistory(query);
      } else {
        setSearchResults([]);
        setIsNothingFound(true)
      }
    } catch (error) {
      console.error('Error fetching data from OMDB API', error);
    } finally {
      setIsSearching(false)
    }
  };

  const updateSearchHistory = (query) => {
    setSearchHistory((prevHistory) => {
      const updatedHistory = [query, ...prevHistory];
      return updatedHistory.slice(0, 5);
    });
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <SearchBar onSearch={handleSearch} />
      { searchHistory.length ? <div>
        <h2>Latest Searches</h2>
        <ul>
          {searchHistory.map((query, index) => (
            <li key={index}>{query}</li>
          ))}
        </ul>
      </div> : '' }
      { isSearching && 'Searching...' }
      { isNothingFound && 'Nothing found with that search criteria.' }
      <Routes>
        <Route path="/" element={<SearchResults results={searchResults} />} />
        <Route path="/movie/:imdbID" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
