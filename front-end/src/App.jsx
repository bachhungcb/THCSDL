import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // use to check if data is loading

  const urlWithProxy = "http://localhost:8080/animes";

  useEffect(() => {
    getDataFromServer();
  }, []); // run only once when the component mounts

  function getDataFromServer() {
    axios
      .get(urlWithProxy)
      .then((res) => {
        setData(res.data);
        setIsLoading(false); // load data successfully, update isLoading to false
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); //if there is an error, update isLoading to false
      });
  }

  // display data in a table
  return (
    <div className="App">
      {!isLoading && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Poster</th>
                <th>Genre</th>
                <th>Status</th>
                <th>Episodes</th>
              </tr>
            </thead>
            <tbody>
              {data.map((anime) => (
                <tr key={anime.anime_id}>
                  <td>{anime.title}</td>
                  <td>{anime.animePoster && <img src={anime.animePoster} alt={anime.title} />}</td>
                  <td>{anime.genres}</td>
                  <td>{anime.stat}</td>
                  <td>{anime.episodes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
