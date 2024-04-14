
-- crating database
CREATE DATABASE IF NOT EXISTS online_auction;

USE online_auction;

--  creating table user
-- DROP TABLE IF EXISTS users; 
CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(90) NOT NULL,
    last_name VARCHAR(90) NOT NULL,
    role VARCHAR(15) NOT NULL,
    email VARCHAR(320) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    activation_status BOOLEAN NOT NULL,
    password VARCHAR(255),
    profile_pic VARCHAR(255),
    activation_code VARCHAR(10),
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    deleted_at TIMESTAMP
);

-- creating shipping address
-- DROP TABLE IF EXISTS shiping_address;
CREATE TABLE IF NOT EXISTS shipping_address(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    city VARCHAR(90) NOT NULL,
    state VARCHAR(90) NOT NULL,
    country VARCHAR(90) NOT NULL,
    pincode VARCHAR(12) NOT NULL,
	foreign key (user_id) references users(id)
);

-- creating auction
-- DROP TABLE IF EXISTS auction;
CREATE TABLE IF NOT EXISTS auctions(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255),
    starting_time DATETIME NOT NULL,
    ending_time DATETIME NOT NULL,
    seller_id INT NOT NULL,
    status VARCHAR(15) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    deleted_at TIMESTAMP,
    foreign key (seller_id) references users(id)
);

-- creating categories
-- DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(45)
);

-- creating products
-- DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    auction_id INT,
    category_id INT NOT NULL,
    description TEXT,
    product_condition VARCHAR(255),
    status VARCHAR(45) NOT NULL,
    starting_price INT,
    winning_bid INT,
    bid_price_interval INT,
    foreign key (auction_id) references auctions(id),
    foreign key (category_id) references categories(id)
);


-- DROP TABLE IF EXISTS parameters;
CREATE TABLE IF NOT EXISTS parameters(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    parameter_name VARCHAR(45) NOT NULL,
    parameter_value VARCHAR(180) NOT NULL,
    foreign key (product_id) references products(id)
);

-- creating product_images
-- DROP TABLE IF EXISTS product_images;
CREATE TABLE IF NOT EXISTS product_images(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    deleted_at TIMESTAMP,
    foreign key (product_id) references products(id)
);

-- creating user_queries
-- DROP TABLE IF EXISTS user_queries;
CREATE TABLE IF NOT EXISTS user_queries(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email INT NOT NULL,
    query_message VARCHAR(900) NOT NULL
);

-- creating login_log
-- DROP TABLE IF EXISTS login_log;
CREATE TABLE IF NOT EXISTS login_logs(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    status BOOLEAN NOT NULL
);

-- creating orders
-- DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    auction_id INT NOT NULL,
    buyer_id INT NOT NULL,
    address_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    deleted_at TIMESTAMP,
    foreign key (auction_id) references auctions(id),
    foreign key (buyer_id) references users(id),
	foreign key (address_id) references shipping_address(id)
);

-- creating bids
-- DROP TABLE IF EXISTS bids;
CREATE TABLE IF NOT EXISTS bids(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    auction_id INT NOT NULL,
    product_id INT NOT NULL,
    buyer_id INT NOT NULL,
    bid_amount INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    foreign key (auction_id) references auctions(id),
    foreign key (product_id) references products(id),
    foreign key (buyer_id) references users(id)
);

-- creating order_items
-- DROP TABLE IF EXISTS order_items;
CREATE TABLE IF NOT EXISTS order_items(
    id INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    deleted_at TIMESTAMP,
    foreign key (order_id) references orders(id),
    foreign key (product_id) references products(id)
);

-- creating payment_details
-- DROP TABLE IF EXISTS payment_details;
CREATE TABLE IF NOT EXISTS payment_details(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    amount INT NOT NULL,
    method VARCHAR(90) NOT NULL,
    payment_date DATE NOT NULL,
    card_no INT,
    cvv INT,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
     foreign key (order_id) references orders(id)
);


INSERT INTO auctions VALUES (1,'Fun Auction','Lorem ipsum dolor sit amet. Ab debitis velit hic iusto velit ut labore praesentium. Rem autem fugiat aut quaerat deserunt ut maiores numquam hic enime.','/assets/furniture.jpeg','2024-04-01 12:00:00','2024-04-01 13:00:00',1,'closed','2024-04-10 09:11:29','2024-04-10 09:11:29',NULL),(2,'Gorgeous Auction','Lorem ipsum dolor sit amet. Ab debitis velit hic iusto velit ut labore praesentium. Rem autem fugiat aut quaerat deserunt ut maiores numquam hic enime.','/assets/jewel.jpeg','2024-04-10 17:00:00','2024-04-10 18:00:00',1,'start','2024-04-10 10:30:15','2024-04-10 10:30:15',NULL);

INSERT INTO bids VALUES (1,1,1,2,10000,'2024-04-10 10:12:17');

INSERT INTO categories VALUES (1,'Antiques'),(2,'Art'),(3,'Electronics'),(4,'Books'),(5,'Jewelery'),(6,'Wine'),(7,'Furniture');

INSERT INTO login_logs VALUES (1,'hadiya.pathan@gmail.com',0),(2,'abhishek.verma@gmail.com',1);

INSERT INTO order_items VALUES (1,1,1,'2024-04-10 10:15:44','2024-04-10 10:15:44',NULL);

INSERT INTO orders VALUES (1,1,2,1,'2024-04-10 10:09:30','2024-04-10 10:09:30',NULL);

INSERT INTO parameters VALUES (1,1,'height','500mm'),(2,1,'width','1000mm'),(3,1,'depth','600mm');

INSERT INTO payment_details VALUES (1,1,10000,'cash','2024-04-09',NULL,NULL,'2024-04-10 10:18:44');

INSERT INTO product_images VALUES (1,1,'/assets/furniture.jpeg','2024-04-10 10:03:33','2024-04-10 10:03:33',NULL);

INSERT INTO products VALUES (1,'Antique Desk',1,7,'The department of Furniture and Decorative Arts specialises in furniture and objects of decoration from all over the world.','The item is in new brand and the condition is good and it is never used','sold',5000,10000,100),(2,'Jewellery',2,5,'The department of Vintage Jewellery and Silverware curates extraordinary jewels with exquisite designs and silver items.','The item is in new brand and the condition is good and it is never used','sold',5000,10000,100);

INSERT INTO shipping_address VALUES (1,2,'101,Pathan,near pvr mall','101,Pathan,near pvr mall','Surat','Gujarat','India','325416'),(2,3,'Abhishek, behind star bazaar','Abhishek, behind star bazaar','Ahmedabad','Gujarat','India','369258');

INSERT INTO users VALUES (1,'Harshal','Kahar','seller','harshal.kahar@gmail.com','2002-11-24','male',1,NULL,NULL,'qwertyuiop','2024-04-10 08:02:31','2024-04-10 08:02:31',NULL),(2,'Hadiya','Pathan','bidder','hadiya.pathan@gmail.com','2002-06-20','female',1,NULL,NULL,'asdfghjklz','2024-04-10 08:06:32','2024-04-10 08:06:32',NULL),(3,'Abhishek','Verma','bidder','abhishek.verma@gmail.com','2001-06-15','male',1,NULL,NULL,'xcvbnmzqwe','2024-04-10 08:50:39','2024-04-10 08:50:39',NULL);
