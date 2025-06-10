--@block 
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL ,
    type TEXT NOT NULL ,
    password INT(6) NOT NULL ,
    email VARCHAR(255) NOT NULL UNIQUE,
    previous VARCHAR(255)
);
CREATE TABLE Product (
    P_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Price DECIMAL(10, 2),
    Description TEXT
);

CREATE TABLE Order (
    Order_ID INT PRIMARY KEY,
    Order_Amount DECIMAL(10, 2),
    Order_Date DATE
);

CREATE TABLE Customer (
    User_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255)
);

CREATE TABLE Payment (
    Payment_ID INT PRIMARY KEY,
    Type VARCHAR(50),
    Amount DECIMAL(10, 2)
);

CREATE TABLE Cart (
    Cart_ID INT PRIMARY KEY,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES Customer(User_ID)
);

CREATE TABLE Category (
    C_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Picture VARCHAR(255),
    Description TEXT
);