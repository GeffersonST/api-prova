import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP.
import './App.css'; // Importa um arquivo de estilo CSS.
import { useEffect, useState } from 'react'; // Importa os hooks useEffect e useState do React.

function App() {
  const [pokemonData, setPokemonData] = useState([]); // Define um estado 'pokemonData' usando o hook useState, inicializado como um array vazio.

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Faz uma requisição GET para a API do Pokémon usando axios.
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const pokemons = response.data.results;

        // Utiliza o método map para criar um array de promessas para obter os detalhes de cada Pokémon.
        const pokemonDetails = await Promise.all(
          pokemons.map(async (pokemon) => {
            // Faz uma nova requisição GET para obter os detalhes de um Pokémon específico.
            const detailsResponse = await axios.get(pokemon.url);
            const imageUrl = detailsResponse.data.sprites.front_default;
            // Retorna um objeto com o nome e a URL da imagem do Pokémon.
            return { name: pokemon.name, imageUrl };
          })
        );

        // Atualiza o estado 'pokemonData' com os detalhes dos Pokémon.
        setPokemonData(pokemonDetails);
      } catch (error) {
        // Em caso de erro, exibe uma mensagem no console.
        console.error("Erro ao buscar dados de Pokémon:", error);
      }
    };

    // Chama a função 'fetchPokemonData' quando o componente é montado ([] como segundo argumento).
    fetchPokemonData();
  }, []);

  return (
    <div className="App">
      <div className="App-background">
        <h1>Lista de Pokémon</h1>
        <ul>
          {/* Mapeia os dados dos Pokémon e cria uma lista de elementos <li> para exibir cada Pokémon. */}
          {pokemonData.map((pokemon) => (
            <li key={pokemon.name}>
              <img src={pokemon.imageUrl} alt={pokemon.name} />
              {pokemon.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
