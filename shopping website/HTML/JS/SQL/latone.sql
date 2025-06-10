CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Address TEXT,
    PhoneNumber VARCHAR(15),
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL,
    CategoryID INT,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(10, 2),
    Status VARCHAR(20),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE Cart (
    CartID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
CREATE TABLE Roles (
    RoleID INT PRIMARY KEY AUTO_INCREMENT,
    RoleName VARCHAR(50) NOT NULL
);

ALTER TABLE Users ADD RoleID INT;
ALTER TABLE Users ADD FOREIGN KEY (RoleID) REFERENCES Roles(RoleID);

CREATE TABLE Payments (
    PaymentID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    PaymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Amount DECIMAL(10, 2),
    PaymentMethod VARCHAR(50),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
CREATE TABLE Shipping (
    ShippingID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    Address TEXT NOT NULL,
    ShippingStatus VARCHAR(50) DEFAULT 'Pending',
    EstimatedDelivery TIMESTAMP,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
CREATE TABLE Wishlists (
    WishlistID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ProductID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
CREATE TABLE Reviews (
    ReviewID INT PRIMARY KEY AUTO_INCREMENT,
    ProductID INT,
    UserID INT,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    ReviewText TEXT,
    ReviewDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE INDEX idx_product_name ON Products(Name);
CREATE INDEX idx_order_date ON Orders(OrderDate);

CREATE TABLE AuditLogs (
    LogID INT PRIMARY KEY AUTO_INCREMENT,
    Action VARCHAR(50),
    TableName VARCHAR(50),
    OldValue TEXT,
    NewValue TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Coupons (
    CouponID INT PRIMARY KEY AUTO_INCREMENT,
    Code VARCHAR(20) NOT NULL,
    Discount DECIMAL(5, 2),
    ExpiryDate TIMESTAMP
);

ALTER TABLE Orders ADD CouponID INT;
ALTER TABLE Orders ADD FOREIGN KEY (CouponID) REFERENCES Coupons(CouponID);
