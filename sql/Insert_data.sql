INSERT INTO anime (anime_id, title, synopsis, age_requirement, anime_type, episodes)
VALUES
  (10050, 'THCSDL','La hoc phan thuc hanh cua hoc phan LT CSDL','R18','anime','120')

INSERT INTO informations (anime_id, scores, ranks, popularity, favourite)
VALUES
  (10050, '9.5', 1, 1000, 500);

INSERT INTO anime_status (anime_id, stat, aired_from, aired_to, premiered)
VALUES
  (10050, 'Finished Airing', '2002-10-03', '2007-02-08', '2002-10-03')

DECLARE @Id INT;
SET @Id = (SELECT COUNT(*) FROM new_character) + 1;
INSERT INTO new_character(Id, Name, Description)
VALUES
(@Id, 'Dam Thanh Bach', 'Thiet ke CSDL, thiet ke BE, Xu ly du lieu');
INSERT INTO link_character(character_id, anime_id)
VALUES
(@Id,10050)

UPDATE link_character
SET Roles = 'Main'
WHERE character_id = 54466

INSERT INTO link_genres(anime_id, genres_id)
VALUES(10050,(SELECT DISTINCT link_genres.genres_id FROM link_genres
JOIN genres ON genres.genres_id = link_genres.genres_id
WHERE genres.genres = 'Action'))

CREATE PROCEDURE InsertAnimeData
@anime_id INT,
@char_id INT,
@title VARCHAR(50),
@synopsis VARCHAR(MAX), 
@age_requirement VARCHAR(50),
@anime_type VARCHAR(10),
@episodes VARCHAR(50),
@animePoster VARCHAR(MAX),
@nameURL VARCHAR(MAX),
@scores VARCHAR(50),
@ranks INT,
@popularity INT,
@stat VARCHAR(20),
@aired_from VARCHAR(20),
@aired_to VARCHAR(20),
@premiered VARCHAR(20),
@name VARCHAR(100),
@profile VARCHAR(MAX),
@description VARCHAR(MAX),
@role VARCHAR(20),
@genres VARCHAR(50)


AS
BEGIN
	SET @anime_id = (SELECT COUNT(*) FROM anime) +1;
	SET @char_id = (SELECT COUNT(*) FROM new_character) + 1;

	INSERT INTO anime (anime_id, title, synopsis, age_requirement, anime_type, episodes, animePoster, nameURL)
	VALUES (@anime_id, @title,@synopsis,@age_requirement,@anime_type,@episodes,@animePoster,@nameURL);

	INSERT INTO informations (anime_id, scores, ranks, popularity, favourite)
	VALUES(@anime_id, @scores, @ranks, @popularity, 0);

	INSERT INTO anime_status (anime_id, stat, aired_from, aired_to, premiered)
	VALUES(@anime_id, @stat, @aired_from, @aired_to, @premiered);

	INSERT INTO new_character(Id, Name, Description)
	VALUES(@char_id, @name, @description);

	INSERT INTO link_character(character_id, anime_id, Roles)
	VALUES(@char_id,@anime_id, @role);

	INSERT INTO link_genres(anime_id, genres_id)
	VALUES(@anime_id,(SELECT DISTINCT link_genres.genres_id FROM link_genres
	JOIN genres ON genres.genres_id = link_genres.genres_id
	WHERE genres.genres = @genres))
END
