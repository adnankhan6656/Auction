const express = require("express");
const multer=require("multer")
const route = express.Router();


const { sellerDashboard } = require("../controllers/seller_dashboard")
const {get_add_auction,post_add_auctions} = require("../controllers/add_auctions");
const { get_auction_products, get_add_auction_products } = require("../controllers/get_auction_products");
const { getSelectedProducts } = require("../controllers/get_add_auction_selected_products");
route.get("/dashboard", sellerDashboard);
route.get("/dashboard/add_auctions",get_add_auction)
route.post("/dashboard/add_auctions" ,post_add_auctions);
route.get("/dashboard/get_add_product_auction",get_add_auction_products);
route.post("/dashboard/get_add_auction_selected_products",getSelectedProducts)

module.exports = route;
