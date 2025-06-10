
-- @block
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    address TEXT,
    password INT,
    email VARCHAR(255) NOT NULL UNIQUE,
    previous VARCHAR(255)
);

