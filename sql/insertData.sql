INSERT INTO anime(anime_id, title, synopsis, genres, age_requirement, anime_type, episodes)
SELECT anime_id, name, synopsis,genre, age_requirement, type, episodes FROM anime_1

INSERT INTO anime_producers
SELECT * FROM producers_1

INSERT INTO producers(producers_name, producers_id)
SELECT producer, producer_id FROM anime_producer_1


INSERT INTO characters(anime_id, names, roles)
SELECT anime_id, characterName,characterRole FROM characters_1

INSERT INTO informations(anime_id, scores, ranks, popularity, favourite)
SELECT anime_id, score, ranked, popularity, favourite FROM anime_statistic_1

INSERT INTO anime_status(anime_id, stat, aired_from, aired_to, premiered)
SELECT anime_id, status, aired_from, aired_to, premiered FROM anime_status_1

UPDATE anime
SET anime.animePoster = anime_1.animePoster
FROM anime
INNER JOIN anime_1 ON anime.anime_id = anime_1.anime_id;

UPDATE anime
SET anime.nameURL = link_1.nameURL
FROM anime
INNER JOIN link_1 ON anime.title = link_1.name;

UPDATE characters
SET characters.characterProfile = characters_1.characterProfile
FROM characters
INNER JOIN characters_1 ON characters.names = characters_1.characterName;

DELETE FROM anime_URL
