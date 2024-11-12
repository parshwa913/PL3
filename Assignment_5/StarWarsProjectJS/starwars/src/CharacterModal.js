import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CharacterModal.css";

const CharacterModal = ({ character, closeModal, position }) => {
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (character?.homeworld) {
        const homeworldResponse = await axios.get(character.homeworld);
        setHomeworld(homeworldResponse.data);
      }
      if (character?.films) {
        const filmResponses = await Promise.all(
          character.films.map((filmUrl) => axios.get(filmUrl))
        );
        setFilms(filmResponses.map((res) => res.data.title));
      }
    };
    fetchDetails();
  }, [character]);

  if (!character) return null;

  const dateAdded = new Date(character.created).toLocaleDateString("en-GB");

  return (
    <div
      className="info-popup"
      style={{
        top: `${position.top}px`, 
        left: `${position.left}px`, 
      }}
    >
      <h2>{character.name}</h2>
      <p><strong>Height:</strong> {character.height / 100} m</p>
      <p><strong>Mass:</strong> {character.mass} kg</p>
      <p><strong>Birth Year:</strong> {character.birth_year}</p>
      <p><strong>Date Added:</strong> {dateAdded}</p>
      <p><strong>Number of Films:</strong> {films.length}</p>
      <ul>
        {films.map((film, index) => (
          <li key={index}>{film}</li>
        ))}
      </ul>
      {homeworld && (
        <>
          <h3>Homeworld Details</h3>
          <p><strong>Name:</strong> {homeworld.name}</p>
          <p><strong>Terrain:</strong> {homeworld.terrain}</p>
          <p><strong>Climate:</strong> {homeworld.climate}</p>
          <p><strong>Population:</strong> {homeworld.population}</p>
        </>
      )}
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default CharacterModal;
