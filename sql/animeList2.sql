
CREATE TABLE anime(
	anime_id INT NOT NULL PRIMARY KEY,
	title VARCHAR(100),
	synopsis VARCHAR(MAX),
	age_requirement VARCHAR(100),
	anime_type VARCHAR(10),
	episodes VARCHAR(50),
	animePoster VARCHAR(MAX),
	nameURL VARCHAR(MAX)
);

CREATE TABLE informations(
	anime_id INT FOREIGN KEY REFERENCES anime(anime_id),
	scores VARCHAR(50),
	ranks INT,
	popularity INT,
	favourite INT
);

CREATE TABLE anime_status(
	anime_id INT FOREIGN KEY REFERENCES anime(anime_id),
	stat VARCHAR(20),
	aired_from VARCHAR(20) DEFAULT 'Unknown',
	aired_to VARCHAR(20) DEFAULT 'Unknown',
	premiered VARCHAR(20) DEFAULT 'Unknown',
);

CREATE TABLE producers(
	producers_id INT NOT NULL PRIMARY KEY,
	producers_name VARCHAR(100)
);

CREATE TABLE anime_producers(
	anime_id INT FOREIGN KEY REFERENCES anime(anime_id),
	producers_id INT FOREIGN KEY REFERENCES producers(producers_id)
);

CREATE TABLE new_character(
	Id INT NOT NULL PRIMARY KEY,
	Name VARCHAR(100),
	Profile VARCHAR(MAX),
	Description VARCHAR(MAX),

);

CREATE TABLE link_character(
	anime_id INT,
	character_id INT,
	Roles VARCHAR(20)
);

ALTER TABLE link_character
ADD FOREIGN KEY (character_id) REFERENCES new_character(Id);

ALTER TABLE link_character
ADD FOREIGN KEY (anime_id) REFERENCES anime(anime_id);



CREATE TABLE genres(
	genres_id INT IDENTITY(1,1),
	genres VARCHAR(50)
);

CREATE TABLE link_genres(
	anime_id INT, 
	genres_id INT
);

ALTER TABLE link_genres
ADD FOREIGN KEY (genres_id) REFERENCES genres(genres_id);

ALTER TABLE link_genres
ADD FOREIGN KEY (anime_id) REFERENCES anime(anime_id);

ALTER TABLE new_character
ALTER COLUMN Id INT NOT NULL;

CREATE TABLE Users(
	Id INT IDENTITY(1,1),
	Email VARCHAR(20),
	Password VARCHAR(20),
	Role VARCHAR(10),
	FullName NVARCHAR(50),
	Birthday Date,
	Avatar VARCHAR(30),
	PhoneNumber VARCHAR(11)
);