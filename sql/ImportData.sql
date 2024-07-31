DECLARE @JSON NVARCHAR(MAX);

-- Step 1: Read JSON file into a variable
SELECT @JSON = BulkColumn
FROM OPENROWSET (
    BULK 'D:\THCSDL\sql\data\users_1.json',
    SINGLE_CLOB
) AS import;

-- Step 2: Parse the JSON data
DECLARE @ParsedData TABLE (
	Id INT,
	Name VARCHAR(100),
	Profile VARCHAR(MAX),
	Description VARCHAR(MAX)
);

-- Correctly specify JSON path in WITH clause
INSERT INTO @ParsedData (Email, Password, Role, FullName, Birthday, Avatar)
SELECT email, password, role, full_name, birthday, avatar
FROM OPENJSON (@JSON)
WITH (
    Id INT,
	Name VARCHAR(100),
	Profile VARCHAR(MAX),
	Description VARCHAR(MAX)
);

-- Check the parsed data
SELECT * FROM @ParsedData;

-- Step 3: Insert the parsed data into the Users table
INSERT INTO Users (Email, Password, Role, FullName, Birthday, Avatar)
SELECT Email, Password, Role, FullName, Birthday, Avatar
FROM @ParsedData;

-- Optional: Check if the data has been inserted correctly
SELECT * FROM Users;
