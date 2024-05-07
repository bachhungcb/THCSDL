INSERT INTO anime(anime_id, title, synopsis, genres, age_requirement, anime_type, episodes)
SELECT anime_id, name, synopsis,genre, age_requirement, type, episodes FROM anime_1

USE master;
SELECT name, password FROM syslogins;

INSERT INTO anime_producers
SELECT * FROM producers_1

INSERT INTO producers(producers_name, producers_id)
SELECT producer, producer_id FROM anime_producer_1


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


DELETE FROM anime_URL;

INSERT INTO new_character(Roles)
SELECT characters.roles FROM new_character
JOIN characters ON characters.names = new_character.Name
WHERE characters.names = new_character.Name;

UPDATE new_character
SET new_character.Roles = characters.roles
FROM characters
JOIN new_character ON characters.names = new_character.Name
WHERE characters.names = new_character.Name;

UPDATE new_character
SET new_character.Profile = characters.characterProfile
FROM characters
JOIN new_character ON characters.names = new_character.Name
WHERE characters.names = new_character.Name;

INSERT INTO link_character(anime_id)
SELECT characters.anime_id FROM characters
JOIN new_character ON new_character.Name = characters.names;

CREATE TABLE link_1(
	anime_id INT, 
	char_id INT
);

WITH NumberedLink1 AS (
    SELECT char_id, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS rn
    FROM link_1
), NumberedLinkCharacter AS (
    SELECT character_id, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS rn
    FROM link_character
)
UPDATE NumberedLinkCharacter
SET character_id = NumberedLink1.char_id
FROM NumberedLink1
WHERE NumberedLinkCharacter.rn = NumberedLink1.rn;