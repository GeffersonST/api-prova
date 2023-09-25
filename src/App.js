import axios from 'axios';
import './App.css';

function App() {

const getItem = async () => {

  await axios.get("https://pokeapi.co/api/v2/pokemon");

}


getItem();




  return (
    <div className="App">
      <div className="App-background">
      <h1>Lista de Itens</h1>
    <ul>
      <li>Item</li>
      <li>Item</li>
      <li>Item</li>
      <li>Item</li>
      <li>Item</li>
    </ul>

      </div>
    </div>
  );
}

export default App;
