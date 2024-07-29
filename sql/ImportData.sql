DECLARE @JSON NVARCHAR(MAX);

-- Step 1: Read JSON file into a variable
SELECT @JSON = BulkColumn
FROM OPENROWSET (
    BULK 'D:\THCSDL\sql\data\users_1.json',
    SINGLE_CLOB
) AS import;

-- Step 2: Parse the JSON data
DECLARE @ParsedData TABLE (
    Email NVARCHAR(50) UNIQUE,
    Password NVARCHAR(MAX),
    Role NVARCHAR(MAX),
    FullName NVARCHAR(MAX), -- Ensure this is NVARCHAR for Unicode support
    Birthday DATE,
    Avatar NVARCHAR(MAX)
);

-- Correctly specify JSON path in WITH clause
INSERT INTO @ParsedData (Email, Password, Role, FullName, Birthday, Avatar)
SELECT email, password, role, full_name, birthday, avatar
FROM OPENJSON (@JSON)
WITH (
    email NVARCHAR(50) '$.email',
    password NVARCHAR(MAX) '$.password',
    role NVARCHAR(MAX) '$.role',
    full_name NVARCHAR(MAX) '$.full_name', -- Ensure this uses NVARCHAR
    birthday DATE '$.birthday',
    avatar NVARCHAR(MAX) '$.avatar'
);

-- Check the parsed data
SELECT * FROM @ParsedData;

-- Step 3: Insert the parsed data into the Users table
INSERT INTO Users (Email, Password, Role, FullName, Birthday, Avatar)
SELECT Email, Password, Role, FullName, Birthday, Avatar
FROM @ParsedData;

-- Optional: Check if the data has been inserted correctly
SELECT * FROM Users;

INSERT INTO Users (Email,Password,Role,FullName,Birthday,Avatar)
VALUES('bachhungcb@gmail.com','vi2@pipi', 'admin', N'Đàm Thanh Bách', '2004-05-18', 'https://ui-avatars.com/api/?name=Bach+Dam' )

INSERT INTO Users (Email,Password,Role,FullName,Birthday,Avatar)
VALUES('phuongct1412@gmail.com','vi2@pipi', 'admin', N'Đỗ Mạnh Phương', '2004-05-18', 'https://ui-avatars.com/api/?name=Bach+Dam' )
DELETE FROM Users