import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const getItem = async () => {

      await axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
        setItemData(response.data.results);
      })

    }


    getItem();
  },[])






  return (
    <div className="App">
      <div className="App-background">
      <h1>Lista de Itens</h1>
    <ul>
      <li>
    {itemData.map((pokemon) => {
      return <li>{pokemon.name}</li>
    })}

      </li>

    </ul>

      </div>
    </div>
  );
}

export default App;
