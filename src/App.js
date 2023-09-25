import { useEffect, useState } from 'react';
import './App.css'; // Importa um arquivo de estilo CSS.
 // Importa os hooks useEffect e useState do React.
import axios from 'axios';
function App() {

  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
const fetchPokemonData = async () => {

try {

const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
const pokemons = response.data.results;

const pokemonDetails = await Promise.all(
  pokemons.map(async (pokemon) => {
    const detailsResponse = await axios.get(pokemon.url);
    const imageUrl = detailsResponse.data.sprites.front_default;
    return { name: pokemon.name, imageUrl };
  })
);
setPokemonData(pokemonDetails);
} catch (error) {
  console.error("Error ao buscar dados de Pokémon:", error)
}


};




fetchPokemonData();


  },[]);




  return (
    <div className="App">
      <div className="App-background">
        <h1>Lista de Pokémon</h1>
        <ul>
        {pokemonData.map((pokemon) => (
          <li key={pokemon.name}>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          {pokemon.name}</li>
        ))}


        </ul>
      </div>
    </div>
  );
}

export default App;
