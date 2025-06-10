--@block
CREATE TABLE  product_gender(
    product_gender_id INT,
    gender_name VARCHAR(10),
    CONSTRAINT pk_prodgender
    PRIMARY KEY (product_gender_id)
);
INSERT INTO product_gender(product_gender_id,gender_name)VALUES
(1,"women"),
(2,"men");
--@block
CREATE TABLE product_category(
    product_category_id INT,
    category_name VARCHAR(100),
    category_image VARCHAR(400),
    product_gender_id INT,
    CONSTRAINT pk_productcategory
    PRIMARY KEY(product_category_id),
    CONSTRAINT fk_product_gender
    FOREIGN KEY (product_gender_id)REFERENCES product_gender(product_gender_id)
);
INSERT INTO product_category(product_category_id,category_name,category_image,product_gender_id)VALUES
--@martinaarmanios fill the data according to front 
(1,'makeup','path/to/image.extension',1),
(2,'dresses','path/to/inage.extension'1),
(3,'');


--@block
ALTER TABLE product_category
ADD category_description VARCHAR(2000);

UPDATE product_category
SET category_description='the best makeup '
WHERE product_category_id=1;
-- repeat the last 3 lines for each product 

CREATE TABLE product (
    product_id INT;
    product_name VARCHAR(500),
    original_price INT,
    sale_price INT,
    product_category_id INT,
    CONSTRAINT pk_product
    PRIMARY KEY (product_id),
    CONSTRAINT fk_prod_prodcategory
    FOREIGN KEY( product_category_id)REFERENCES product_category(product_category_id)

);
INSERT INTO product(product_id,product_name,original_price,sale_price,product_category_id) VALUES
--@martinaarmanios fill accourding to front 
(1,'pink libgloss', 100,100 , 1)

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