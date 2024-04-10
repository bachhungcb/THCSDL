import { useState } from 'react'
import axios from 'axios'
import './App.css'

//Fetch data from server using proxy sample
function App() {
  const [data, setData] = useState([]);

  const urlWithProxy = "http://localhost:8080/animes";

  function getDataFromServer() {
    axios
      .get(urlWithProxy)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="App">
      <button onClick={getDataFromServer}>Access server using proxy</button>
      <div>
        {data.map((anime) => (
          <div key={anime.anime_id}>
            <h2>Name: {anime.title}</h2>
            <div>{anime.animePoster && <img src={anime.animePoster} alt={anime.title} />}</div><br></br>
            <span>Episodes: {anime.episodes}</span>
            <p>Synopsis: {anime.synopsis}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
