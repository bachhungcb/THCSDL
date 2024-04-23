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
        <div className='main-nav'>

        </div>
      {!isLoading && (
        <div className='top-anime-table-container'>
          <h2 className='top-header'>Top Anime Series</h2>
          <table>
            <thead className='tablehead'>
              <tr>
                <th className='head-poster'>Poster</th>
                <th className='head-title'>Title</th>
                <th className='head-genre'>Genre</th>
                <th className='head-status'>Status</th>
                <th className='head-episodes'>Episodes</th>
              </tr>
            </thead>
            <tbody className='tablebody'>
              {data.map((anime) => (
                <tr key={anime.anime_id}>
                  <td className='body-poster'>{anime.animePoster && <img className='body-poster-img' src={anime.animePoster} alt={anime.title} />}
                    <div className='hover-info'>
                        <h3>{anime.title}</h3>
                        {/* <p>Rank:</p>{informations.ranks}<br></br>
                        <p>Score:</p>{informations.scores}<br></br> */}
                        <p>Genres: {anime.genres}</p>
                        <p>Age requirement: {anime.age_requirement}</p>
                        <p>Type: {anime.anime_type}</p>
                        <p>Episodes: {anime.episodes}</p>
                        <p>Status: {anime.stat}</p>
                    </div>
                  </td>
                  <td className='body-title'>{anime.title}</td>
                  <td className='body-genres'>{anime.genres}</td>
                  <td className='body-status'>{anime.stat}</td>
                  <td className='body-episodes'>{anime.episodes}<br></br>({anime.anime_type})</td>
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
