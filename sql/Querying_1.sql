--Đưa ra các thông tin về một bộ anime với anime id cho trước--
CREATE PROCEDURE AnimeInformation
@anime_id INT
AS
SELECT a.*, i.*, s.*
FROM anime a
 JOIN informations i ON i.anime_id = a.anime_id
 JOIN anime_status s ON s.anime_id = a.anime_id
WHERE a.anime_id = @anime_id;
GO
EXEC AnimeInformation 10050;
SELECT a.*, i.*, s.*
FROM anime a
 JOIN informations i ON i.anime_id = a.anime_id
 JOIN anime_status s ON s.anime_id = a.anime_id
WHERE a.anime_id = 10050;

SELECT * FROM new_character

--Chọn ra top 3 anime có điểm thấp nhất--
CREATE VIEW TOP3Anime AS
SELECT DISTINCT TOP 3 anime.anime_id, anime.title, anime.synopsis, informations.scores
FROM anime
JOIN informations ON informations.anime_id = anime.anime_id
ORDER BY informations.scores;

--chọn ra top 3 anime có điểm cao nhất từ trên xuống--
CREATE VIEW TOP3ANIMEDESC AS
SELECT TOP 3 anime.anime_id, anime.title, anime.synopsis, informations.scores
FROM anime
JOIN informations ON informations.anime_id = anime.anime_id
ORDER BY informations.scores DESC;

--Đưa ra tên của top 3 studio có điểm trung bình cao nhất--
CREATE VIEW TOP3Studio AS
SELECT TOP 50  producers.producers_name, AVG(CONVERT(DECIMAL,informations.scores)) AS Score FROM informations
JOIN anime ON anime.anime_id = informations.anime_id
JOIN anime_producers ON anime_producers.anime_id = anime.anime_id
JOIN producers ON producers.producers_id = anime_producers.producers_id
GROUP BY producers.producers_name
ORDER BY AVG(CONVERT(DECIMAL,informations.scores)) DESC;

--Đưa ra điểm trung bình của một studio anime--
CREATE PROCEDURE studioAVGScore
@producer_id INT
AS
SELECT AVG(CONVERT(DECIMAL,informations.scores)) AS Score, producers.producers_name FROM informations
JOIN anime ON anime.anime_id = informations.anime_id
JOIN anime_producers ON anime_producers.anime_id = anime.anime_id
JOIN producers ON producers.producers_id = anime_producers.producers_id
WHERE producers.producers_id = @producer_id
GROUP BY producers.producers_name;
GO

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
CREATE PROCEDURE getProducerByAnimeId
@anime_id INT
AS
SELECT producers.producers_id AS Id, producers.producers_name AS producers FROM producers
JOIN anime_producers ON anime_producers.producers_id = producers.producers_id
JOIN anime ON anime.anime_id = anime_producers.anime_id
WHERE anime.anime_id = @anime_id
GO

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
SELECT DISTINCT TOP 10 new_character.Name, anime.title, new_character.Profile, new_character.Id, link_character.Roles
        FROM new_character  
		JOIN link_character ON link_character.character_id = new_character.Id
		JOIN anime ON link_character.anime_id = anime.anime_id
        WHERE new_character.Name LIKE '%Dam Thanh Bach%'
        ORDER BY new_character.Name;

--Tìm kiếm nhân vật thông qua anime_id
SELECT new_character.Name, link_character.Roles, anime.title
FROM new_character
JOIN link_character ON link_character.character_id = new_character.Id
JOIN anime ON anime.anime_id = link_character.anime_id
WHERE anime.anime_id = 604;


--Lấy ra producers và tổng số bộ anime mà họ đã sản xuất
CREATE VIEW producersAndTheirAnimes AS
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

--Đưa ra thông tin của một bộ anime dưa trên thể loại anime
CREATE PROCEDURE getAnimeByType 
@offset INT,
@anime_type VARCHAR(10)
AS
SELECT TOP (50) a.*, s.stat, i.scores, i.ranks, i.favourite, i.popularity, s.aired_from, s.aired_to, s.premiered
                FROM anime a
                LEFT JOIN anime_status s ON a.anime_id = s.anime_id
                LEFT JOIN informations i ON a.anime_id = i.anime_id
                WHERE a.anime_id NOT IN (
                SELECT TOP (@offset) anime_id 
                FROM anime 
                ORDER BY anime_id
                )
                AND a.anime_type = @anime_type
                ORDER BY a.anime_id;
GO
--Đưa ra thông tin về nhân vật dựa trên anime_id
SELECT * 
FROM new_character 
JOIN link_character ON link_character.character_id = new_character.Id
WHERE link_character.anime_id = 0
--Đưa ra thông tin về User dựa trên userid
SELECT * FROM Users
WHERE Id = 1999;
--Tạo trigger mới, tự động thêm role user cho các user mới tạo
CREATE TRIGGER trg_insert ON Users
AFTER INSERT
AS
BEGIN
    -- Set the Role to 'user' for newly inserted records
    UPDATE Users
    SET Role = 'user'
    FROM Users
    INNER JOIN inserted ON Users.Id = inserted.Id;
END

EXEC AnimeInformation 0;
EXEC studioAVGScore 0;
EXEC getAnimeByType 0, 'OVA';
EXEC getProducerByAnimeId 0
SELECT * FROM producersAndTheirAnimes

SELECT * FROM User_comment

INSERT INTO User_comment(users_id, anime_id, comment)
VALUES('1999','0','anime rat la hay')
--tạo trigger mới, tự động cập nhật ngày khi user comment
CREATE TRIGGER trg_setAddedDate
ON User_comment
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE User_comment
	SET added_at = GETDATE()
	FROM User_comment uc
	INNER JOIN inserted i ON uc.Id = i.Id
END
--tạo trigger với, tự động cập ngày khi user sửa comment
CREATE TRIGGER trg_setEditedDate
ON User_comment
AFTER UPDATE
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE User_comment
	SET edited_at = GETDATE()
	FROM User_comment uc
	INNER JOIN inserted i ON uc.Id = i.Id
END



SELECT * FROM User_comment
--tạo proc thêm mới vào user favourite list
CREATE PROCEDURE userFavourite
@user_id INT,
@anime_id INT
AS
INSERT INTO User_favourites(users_id, anime_id)
VALUES(@user_id, @anime_id)

CREATE PROCEDURE userFavouriteCharacter
@user_id INT,
@character_id INT
AS
INSERT INTO User_favourite_character(users_id, character_id)
VALUES(@user_id, @character_id)

--tạo proc, chỉ cho phép người dùng sửa comment của chính mình
CREATE PROCEDURE updateUserComment
@user_id INT,
@anime_id INT,
@new_comment VARCHAR(250)
AS
BEGIN
---------Kiểm tra xem đã có userid nhập vào có ở trong bảng comment hay chưa
IF EXISTS(SELECT 1 FROM User_comment WHERE Id = @user_id AND anime_id = @anime_id)
	BEGIN
		UPDATE User_comment
		SET comment = @new_comment
		WHERE Id = @user_id AND anime_id = @anime_id
		SELECT 1 AS Result
	END
ELSE 
	BEGIN
		SELECT 0 AS Result
	END
END;

EXEC updateUserComment 1,0, 'anime  hay'
--tạo trigger mới, tự động thêm thời gian khi người dùng cho anime vào favourite list
CREATE TRIGGER trg_getTime
ON User_favourites
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE User_favourites
	SET User_favourites.added_at = GETDATE()
	FROM User_favourites
	JOIN inserted ON inserted.users_id = User_favourites.users_id
END

CREATE TRIGGER trg_getTime_character
ON User_favourite_character
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE User_favourite_character
	SET User_favourite_character.added_at = GETDATE()
	FROM User_favourite_character
	JOIN inserted ON inserted.users_id = User_favourite_character.users_id
END

CREATE TRIGGER trg_setAddedDate_character
ON User_comment_character
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE User_comment_character
	SET added_at = GETDATE()
	FROM User_comment_character uc
	INNER JOIN inserted i ON uc.Id = i.Id
END
--tạo trigger với, tự động cập ngày khi user sửa comment
CREATE TRIGGER trg_setEditedDate_character
ON User_comment_character
AFTER UPDATE
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE User_comment_character
	SET edited_at = GETDATE()
	FROM User_comment_character uc
	INNER JOIN inserted i ON uc.Id = i.Id
END

--tạo proc mới để ban user
CREATE PROCEDURE banned
@user_id INT
AS
BEGIN
	UPDATE Users
	SET Role = 'banned'
	WHERE Id = @user_id
END

EXEC banned 2000
--tạo proc mới để unban user
CREATE PROCEDURE unban
@user_id INT
AS
BEGIN
	UPDATE Users
	SET Role = 'user'
	WHERE Id = @user_id
END

EXEC unban 2000
