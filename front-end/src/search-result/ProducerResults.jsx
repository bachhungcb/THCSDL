import axios from "axios";
import {useState,useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import {List} from "antd";
import ResultLayout from "../templates/ResultLayout.jsx";
function ProducerResults({ userChoice, searchValue}) {
  const location = useLocation();
  const path= location.pathname.split('/');
  console.log(path);
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    if (searchValue.trim() !== "") {
      axios
        .get(`http://localhost:8080/animes/${userChoice}/${searchValue}`)
        .then((res) => {
          setSearchData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchValue, userChoice]);
  return (
    <div>
      <ResultLayout>
      {searchData.map((producer) => (
        <List.Item key={producer.producers_id}>
          <Link to={`/producer/${producer.producers_id}`}>{producer.producers_name}</Link>
        </List.Item>
      ))}
      </ResultLayout>
    </div>
  );
}

export default ProducerResults;