const {
  getGenres,
  insertGenres,
  insertCharacters,
  insertAnimeInformation,
  deleteAllInfomationByAnimeId,
} = require("../services/dashboardService");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const getGenre = async (req, res) => {
  try {
    const genres = await getGenres();
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const insertCharacter = async (req, res) => {
    try {
        const { animeId, characters } = req.body;
        let count = 0;

        for (const character of characters) {
            const { Name, Profile, Description, Role } = character;
            const result = await insertCharacters(animeId, Name, Profile, Description, Role);

            if (result === 1) {
                count += 1;
            }
        }

        if (count === characters.length) {
            res.status(200).json({ message: "Characters processed successfully" });
        } else {
            res.status(400).json({ message: "Characters not processed" });
        }
    } catch (error) {
        console.error('Error inserting characters:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const insertGenre = async (req, res) => {
  try {
    const { animeId, genres } = req.body; // Lấy animeId và genres từ req.body
    const result = await insertGenres(animeId, genres);
    if (result === 1) {
      res.json({ message: true });
    } else {
      res.status(500).json({ message: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const insertAnime = async (req, res) => {
  try {
    const {
      title,
      synopsis,
      age_requirement,
      anime_type,
      episodes,
      animePoster,
      nameUrl,
      scores,
      ranks,
      popularity,
      favourite,
      stat,
      aired_from,
      aired_to,
      premiered,
    } = req.body;

    const result = await insertAnimeInformation(
      title,
      synopsis,
      age_requirement,
      anime_type,
      episodes,
      animePoster,
      nameUrl,
      scores,
      ranks,
      popularity,
      favourite,
      stat,
      aired_from,
      aired_to,
      premiered
    );

    if (result.status === 1) {
      res.json({
        message: true,
        animeId: result.animeId,
      });
    } else {
      res.status(400).json({ message: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteAnime = async (req, res) => {
    try {
        const { animeId } = req.body;
        const result = await deleteAllInfomationByAnimeId(animeId);
        if (result === 1) {
        res.json({ message: true });
        } else {
        res.status(400).json({ message: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}
module.exports = {
  getGenre,
  insertGenre,
  insertCharacter,
  insertAnime,
  deleteAnime,
};
