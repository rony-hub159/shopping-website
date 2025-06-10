CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    address TEXT,
    password INT(6),
    email VARCHAR(255) NOT NULL UNIQUE,
    previous VARCHAR(255)
);

--@block
INSERT INTO Users(name,email,address,password,previous)
VALUES (
    'alaa',
    'alaa.nabih@ejust.edu.eg',
    'Al Agamy , k21,Alexandria', 
    '654321',
    'none'
);
--@block
SELECT * FROM Users;
--@block
CREATE TABLE Sellers(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    address TEXT,
    password INT(6),
    email VARCHAR(255) NOT NULL UNIQUE,
    products VARCHAR(255)
);

--@block
INSERT INTO Sellers(name,email,address,password,products )
VALUES (
    'shahd',
    'shahd.320230037@ejust.edu.eg',
    'Dakahlia', 
    '157239',
    'barbie hoddie pink, aventures hoddie black , naruto hoddie white '
);
--@block
SELECT * FROM Sellers;
--@block
DELETE FROM Sellers WHERE name = "shahd";
--@block
CREATE TABLE Admins(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    password INT(6),
    email VARCHAR(255) NOT NULL UNIQUE
);
--@block
INSERT INTO Admins(name,email,password )
VALUES (
    'rahma',
    'rahma.320230039@ejust.edu.eg',
    '387594'
    
);
--@block
SELECT * FROM Admins;
--@block
DELETE FROM Admins WHERE id = 1;