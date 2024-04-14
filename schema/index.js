const db = require('../config/connection');
const logger = require('../controllers/logger')

class auctionPlatform {
    static async createDB() {
        const sql = `create database if not exists online_auction`;
        const use_sql = `use online_auction`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        const results1 = await db.query(use_sql);
        if (results1[0].error) throw new Error(rows[0].error.message);
        logger.info("Online Auction Database Successfully if not exists!");
    }
    static async Users() {
        const sql = `CREATE TABLE IF NOT EXISTS users(
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
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Users Table Created Successfully if not exists!");
    }
    static async shippingAddress() {
        const sql = `CREATE TABLE IF NOT EXISTS shipping_address(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            address1 VARCHAR(255) NOT NULL,
            address2 VARCHAR(255),
            city VARCHAR(90) NOT NULL,
            state VARCHAR(90) NOT NULL,
            country VARCHAR(90) NOT NULL,
            pincode VARCHAR(12) NOT NULL,
            foreign key (user_id) references users(id)
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Shipping Address Table Created Successfully if not exists!");
    }
    static async Auctions() {
        const sql = `CREATE TABLE IF NOT EXISTS auctions(
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
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Auctions Table Created Successfully if not exists!");
    }
    static async Categories() {
        const sql = `CREATE TABLE IF NOT EXISTS categories(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            category VARCHAR(45)
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Categories Table Created Successfully if not exists!");
    }
    static async Products() {
        const sql = `CREATE TABLE IF NOT EXISTS products(
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
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Products Table Created Successfully if not exists!");
    }
    static async Parameters() {
        const sql = `CREATE TABLE IF NOT EXISTS parameters(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            parameter_name VARCHAR(45) NOT NULL,
            parameter_value VARCHAR(180) NOT NULL,
            foreign key (product_id) references products(id)
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Parameters Table Created Successfully if not exists!");
    }
    static async productImages() {
        const sql = `CREATE TABLE IF NOT EXISTS product_images(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            image_url VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
            modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
            deleted_at TIMESTAMP,
            foreign key (product_id) references products(id)
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Product Image Table Created Successfully if not exists!");
    }
    static async userQueries(){
        const sql = `CREATE TABLE IF NOT EXISTS user_queries(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email INT NOT NULL,
            query_message VARCHAR(900) NOT NULL
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("User Queries Table Created Successfully if not exists!");
    }
    static async loginLogs(){
        const sql = `CREATE TABLE IF NOT EXISTS login_logs(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(320) NOT NULL,
            status BOOLEAN NOT NULL
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Login Logs Table Created Successfully if not exists!");
    }
    static async Orders(){
        const sql = `CREATE TABLE IF NOT EXISTS orders(
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
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Orders Table Created Successfully if not exists!");
    }
    static async Bids(){
        const sql = `CREATE TABLE IF NOT EXISTS bids(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            auction_id INT NOT NULL,
            product_id INT NOT NULL,
            buyer_id INT NOT NULL,
            bid_amount INT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
            foreign key (auction_id) references auctions(id),
            foreign key (product_id) references products(id),
            foreign key (buyer_id) references users(id)
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Bids Table Created Successfully if not exists!");
    }
    static async orderItems(){
        const sql = `CREATE TABLE IF NOT EXISTS order_items(
            id INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
            order_id INT NOT NULL,
            product_id INT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
            modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
            deleted_at TIMESTAMP,
            foreign key (order_id) references orders(id),
            foreign key (product_id) references products(id)
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Order Items Table Created Successfully if not exists!");
    }
    static async paymentDetails(){
        const sql = `CREATE TABLE IF NOT EXISTS payment_details(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            order_id INT NOT NULL,
            amount INT NOT NULL,
            method VARCHAR(90) NOT NULL,
            payment_date DATE NOT NULL,
            card_no INT,
            cvv INT,
            created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
            foreign key (order_id) references orders(id)
        )`;
        const results = await db.query(sql);
        if (results[0].error) throw new Error(rows[0].error.message);
        logger.info("Payment Details Table Created Successfully if not exists!");
    }
    
}


module.exports = auctionPlatform;