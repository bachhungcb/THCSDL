
CREATE TABLE anime(
	anime_id INT NOT NULL PRIMARY KEY,
	title VARCHAR(100),
	synopsis VARCHAR(MAX),
	genres VARCHAR(MAX),
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
	aired_from VARCHAR(20),
	aired_to VARCHAR(20),
	premiered VARCHAR(20),
);

CREATE TABLE producers(
	producers_id INT NOT NULL PRIMARY KEY,
	producers_name VARCHAR(100)
);

CREATE TABLE anime_producers(
	anime_id INT FOREIGN KEY REFERENCES anime(anime_id),
	producers_id INT FOREIGN KEY REFERENCES producers(producers_id)
);

CREATE TABLE characters(
	anime_id INT FOREIGN KEY REFERENCES anime(anime_id),
	names VARCHAR(100),
	roles VARCHAR(20),
	characterProfile VARCHAR(MAX)
);

CREATE TABLE anime_URL(
	anime_id INT FOREIGN KEY REFERENCES anime(anime_id),
	nameURL VARCHAR(MAX),
	animePoster VARCHAR(MAX),
	characterProfile VARCHAR(MAX)
);

ALTER TABLE anime
ADD animePoster VARCHAR(MAX);

ALTER TABLE characters
ADD characterProfile VARCHAR(MAX);

ALTER TABLE anime
ADD nameURL VARCHAR(MAX);
