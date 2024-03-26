CREATE TABLE Anime (
    anime_id INT NOT NULL,
    anime_name VARCHAR(100) NOT NULL,
	synopsis VARCHAR(100),
	genres VARCHAR(100),
	age_requirement INT,
	producers_id INT NOT NULL,
    CONSTRAINT pkAnime PRIMARY KEY (anime_id)
);

CREATE TABLE Anime_status (
    anime_status_id INT NOT NULL IDENTITY(1,1),
    anime_id INT NOT NULL,
    anime_type VARCHAR(15) NOT NULL,
    episodes INT DEFAULT 0, 
    anime_status VARCHAR(100) NOT NULL DEFAULT 'Unknown',
    aired_from VARCHAR(100) NOT NULL DEFAULT '?',
    aired_to VARCHAR(100) NOT NULL DEFAULT '?',
    premiered VARCHAR(50) DEFAULT '?',

    CONSTRAINT pkAnime_status PRIMARY KEY (anime_status_id),
    CONSTRAINT fkAnime FOREIGN KEY (anime_id) REFERENCES Anime(anime_id)
);

CREATE TABLE Anime_statistics(
	anime_statistics_id INT NOT NULL IDENTITY(1,1),
	anime_id INT NOT NULL,
	score DECIMAL(3,2) NOT NULL DEFAULT 0,
	ranked INT NOT NULL DEFAULT 0, 
	popularity INT NOT NULL DEFAULT 0,
	member INT NOT NULL DEFAULT 0,
	favourite INT NOT NULL DEFAULT 0,

	CONSTRAINT pkAnime_statistics PRIMARY KEY(anime_statistics_id),
	CONSTRAINT fkAnime1 FOREIGN KEY (anime_id) REFERENCES Anime(anime_id)

);

CREATE TABLE Anime_characters(
	anime_character_id INT NOT NULL IDENTITY(1,1),
	anime_id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	gender VARCHAR(10) NOT NULL,

	CONSTRAINT pkAnime_characters PRIMARY KEY(anime_character_id),
	CONSTRAINT fkAnime2 FOREIGN KEY(anime_id) REFERENCES Anime(anime_id),

);



CREATE TABLE Producers(
    id INT NOT NULL,
    name VARCHAR(100) NOT NULL,

    CONSTRAINT pkProducers PRIMARY KEY(id)
);


CREATE TABLE Anime_Producers(
    anime_id INT NOT NULL,
    producer_id INT NOT NULL,
	producer_name VARCHAR(50),

    CONSTRAINT fkAnime5 FOREIGN KEY(anime_id) REFERENCES Anime(anime_id),
    CONSTRAINT fkProducers FOREIGN KEY(producer_id) REFERENCES Producers(id)
);

