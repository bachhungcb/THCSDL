--Đưa ra các thông tin về một bộ anime với anime id cho trước--
SELECT	anime.anime_id, anime.title, informations.scores, informations.ranks, characters.names, characters.roles,
		anime_status.aired_from,anime_status.aired_to
FROM anime
 JOIN characters ON characters.anime_id = anime.anime_id
 JOIN informations ON informations.anime_id = anime.anime_id
 JOIN anime_status ON anime_status.anime_id = anime.anime_id
WHERE anime.anime_id = 0;


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
