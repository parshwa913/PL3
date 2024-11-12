import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterModal from "./CharacterModal";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
        setCharacters(response.data.results);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [page]);

  const handleCharacterClick = (character, event) => {
    const rect = event.target.getBoundingClientRect(); 
    const top = rect.bottom + window.scrollY; 
    const left = rect.left + window.scrollX; 
    setModalPosition({ top, left }); 
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, 9));
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className={`App ${selectedCharacter ? 'modal-open' : ''}`}>
      <h1>Star Wars Characters</h1>
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">Failed to load characters. Please try again later.</div>}
      <div className="character-list">
        {!loading && !error && characters.map((character, index) => (
          <div
            key={index}
            className={`character-card ${selectedCharacter ? 'disabled' : ''}`}
            onClick={(e) => handleCharacterClick(character, e)} 
          >
            <h3>{character.name}</h3>
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${getCharacterId(character.url)}.jpg`}
              alt={character.name}
            />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <button onClick={nextPage} disabled={page === 9}>Next</button>
      </div>
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          closeModal={closeModal}
          position={modalPosition} 
        />
      )}
    </div>
  );
}

function getCharacterId(url) {
  const id = url.match(/\/([0-9]*)\/$/);
  return id ? id[1] : null;
}

export default App;
