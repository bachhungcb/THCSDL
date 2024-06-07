--Đưa ra các thông tin về một bộ anime với anime id cho trước--
SELECT anime.title, informations.scores, informations.ranks, anime.episodes,
 anime.synopsis, anime_status.aired_from,anime_status.aired_to, informations.favourite,
 informations.popularity, genres.genres
FROM anime
 JOIN informations ON informations.anime_id = anime.anime_id
 JOIN anime_status ON anime_status.anime_id = anime.anime_id
 JOIN link_genres ON link_genres.anime_id = anime.anime_id
 JOIN genres ON genres.Id = link_genres.genres_id
WHERE anime.anime_id = 0;

SELECT * FROM anime

SELECT * FROM anime

--Chọn ra top 3 anime có điểm cao nhất từ dưới lên--
SELECT DISTINCT TOP 3 anime.anime_id, anime.title, anime.synopsis, informations.scores
FROM anime
JOIN informations ON informations.anime_id = anime.anime_id
ORDER BY informations.scores;

--chọn ra top 3 anime có điểm cao nhất từ trên xuống--
SELECT TOP 3 anime.anime_id, anime.title, anime.synopsis, informations.scores
FROM anime
JOIN informations ON informations.anime_id = anime.anime_id
ORDER BY informations.scores DESC;

--Đưa ra tên của top 3 studio có điểm trung bình cao nhất--
SELECT TOP 50  producers.producers_name, AVG(CONVERT(DECIMAL,informations.scores)) AS Score FROM informations
JOIN anime ON anime.anime_id = informations.anime_id
JOIN anime_producers ON anime_producers.anime_id = anime.anime_id
JOIN producers ON producers.producers_id = anime_producers.producers_id
GROUP BY producers.producers_name
ORDER BY AVG(CONVERT(DECIMAL,informations.scores)) DESC;

--Đưa ra điểm trung bình của một studio anime--
SELECT AVG(CONVERT(DECIMAL,informations.scores)) AS Score, producers.producers_name FROM informations
JOIN anime ON anime.anime_id = informations.anime_id
JOIN anime_producers ON anime_producers.anime_id = anime.anime_id
JOIN producers ON producers.producers_id = anime_producers.producers_id
WHERE producers.producers_id = 0
GROUP BY producers.producers_name;

--Đưa ra toàn bộ điểm trung bình của các studio anime--
SELECT AVG(CONVERT(DECIMAL,informations.scores)) AS Score, producers.producers_name FROM informations
JOIN anime ON anime.anime_id = informations.anime_id
JOIN anime_producers ON anime_producers.anime_id = anime.anime_id
JOIN producers ON producers.producers_id = anime_producers.producers_id
GROUP BY producers.producers_name
ORDER BY AVG(CONVERT(DECIMAL,informations.scores)) DESC;

--Đưa ra 3 anime có điểm thấp nhất--
SELECT TOP 3 anime.title, informations.scores FROM anime
JOIN informations ON anime.anime_id = informations.anime_id
ORDER BY informations.scores;

--Đưa ra anime có thể loại X--
SELECT DISTINCT TOP 10 anime.title, genres.genres, informations.scores
FROM anime 
JOIN informations ON informations.anime_id = anime.anime_id 
JOIN link_genres ON link_genres.anime_id = anime.anime_id
JOIN genres ON genres.Id = link_genres.genres_id
WHERE genres.genres LIKE '%Historical%' 
ORDER BY informations.scores DESC;


--Đưa ra thông tin producers của một bộ anime--
SELECT producers.producers_id AS Id, producers.producers_name AS producers FROM producers
JOIN anime_producers ON anime_producers.producers_id = producers.producers_id
JOIN anime ON anime.anime_id = anime_producers.anime_id
WHERE anime.anime_id = 0


--Tìm kiếm thông tin của một bộ anime thông qua tên--
CREATE INDEX ix_anime_title ON anime(title)
CREATE INDEX ix_animeStatus_animeID ON anime_status(anime_id)
CREATE INDEX ix_informations_animeID ON informations(anime_id)
SELECT anime.title, informations.scores, informations.ranks, anime.episodes, anime.synopsis, 
anime_status.aired_from,anime_status.aired_to, informations.favourite, informations.popularity 
FROM anime
 INNER JOIN informations ON informations.anime_id = anime.anime_id
 INNER JOIN anime_status ON anime_status.anime_id = anime.anime_id
WHERE anime.title LIKE '%Hen%'

--Tìm kiếm nhân vật thông qua tên
CREATE INDEX ix_characters_name ON new_character(Name)
SELECT DISTINCT TOP 10 new_character.Name, new_character.Profile, new_character.Id
        FROM new_character  
        WHERE new_character.Name LIKE '%Edogawa%'
        ORDER BY new_character.Name;

--Tìm kiếm nhân vật thông qua anime_id
SELECT new_character.Name, new_character.Roles, anime.title
FROM new_character
JOIN link_character ON link_character.character_id = new_character.Id
JOIN anime ON anime.anime_id = link_character.anime_id
WHERE anime.anime_id = 604;


SELECT TOP 50  producers.producers_name, SUM(anime.anime_id) AS Total_Anime FROM informations
JOIN anime ON anime.anime_id = informations.anime_id
JOIN anime_producers ON anime_producers.anime_id = anime.anime_id
JOIN producers ON producers.producers_id = anime_producers.producers_id
GROUP BY producers.producers_name
ORDER BY AVG(CONVERT(DECIMAL,informations.scores)) DESC;
--Lấy ra producers và tổng số bộ anime mà họ đã sản xuất
SELECT producers.producers_name, SUM(anime.anime_id) AS Total_Anime 
      FROM informations
      JOIN anime ON anime.anime_id = informations.anime_id
      JOIN anime_producers ON anime_producers.anime_id = anime.anime_id
      JOIN producers ON producers.producers_id = anime_producers.producers_id
      GROUP BY producers.producers_name
      ORDER BY AVG(CONVERT(DECIMAL,informations.scores)) DESC
      OFFSET 0 ROWS
	  FETCH NEXT 50 ROWS ONLY;
--Đưa ra thông tin của một producers dựa trên id của producers đó
SELECT producers.producers_id AS Id, producers.producers_name AS producers FROM producers
WHERE producers.producers_id = 1


SELECT new_character.Name, anime.title AS title FROM anime
JOIN link_character ON link_character.anime_id = anime.anime_id
JOIN new_character ON link_character.character_id = new_character.Id
WHERE new_character.Id = 4505

CREATE TRIGGER trg_update ON Users
AFTER UPDATE
AS
BEGIN
    -- Check if the Role column is updated
    IF UPDATE(Role)
    BEGIN
        UPDATE Users
        SET Role = 'user'
        FROM inserted
        WHERE Users.Id = inserted.Id; -- Assuming Id is the primary key
    END
END
