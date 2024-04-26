--Đưa ra các thông tin về một bộ anime với anime id cho trước--
SELECT anime.title, informations.scores, informations.ranks, anime.episodes, anime.synopsis, anime_status.aired_from,anime_status.aired_to, informations.favourite, informations.popularity
FROM anime
 JOIN informations ON informations.anime_id = anime.anime_id
 JOIN anime_status ON anime_status.anime_id = anime.anime_id
WHERE anime.anime_id = 0;


SELECT * FROM anime

--Chọn ra top 3 anime có điểm cao nhất từ dưới lên--
SELECT TOP 3 anime.anime_id, anime.title, anime.synopsis, anime.genres, informations.scores
FROM anime
JOIN informations ON informations.anime_id = anime.anime_id
ORDER BY informations.scores;

--chọn ra top 3 anime có điểm cao nhất từ trên xuống--
SELECT TOP 3 anime.anime_id, anime.title, anime.synopsis, anime.genres, informations.scores
FROM anime
JOIN informations ON informations.anime_id = anime.anime_id
ORDER BY informations.scores DESC;

--Đưa ra tên của top 3 studio có điểm trung bình cao nhất--
SELECT TOP 3  producers.producers_name, AVG(CONVERT(DECIMAL,informations.scores)) AS Score FROM informations
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
SELECT anime.title, anime.genres FROM anime JOIN informations ON informations.anime_id = anime.anime_id WHERE anime.genres LIKE '%Historical%' ORDER BY informations.scores DESC;


--Đưa ra thông tin producers của một bộ anime--
SELECT producers.producers_id AS Id, producers.producers_name AS producers FROM producers
JOIN anime_producers ON anime_producers.producers_id = producers.producers_id
JOIN anime ON anime.anime_id = anime_producers.anime_id
WHERE anime.anime_id = 0


--Tìm kiếm thông tin của một bộ anime thông qua tên--
SELECT anime.title, informations.scores, informations.ranks, anime.episodes, anime.synopsis, anime_status.aired_from,anime_status.aired_to, informations.favourite, informations.popularity
FROM anime
 JOIN informations ON informations.anime_id = anime.anime_id
 JOIN anime_status ON anime_status.anime_id = anime.anime_id
WHERE anime.title LIKE '%Conan%'
