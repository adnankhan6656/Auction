const express = require("express");
const route = express.Router();
const { profile } = require("../controllers/profile");
const {nav_bar} = require("../controllers/navbar");
const {live_auction} = require("../controllers/live_auctions")
const {upcoming_auction} = require("../controllers/upcoming_auctions")
const {product_details} = require("../controllers/product_details");
const {user_profile} = require("../controllers/user_profile")
const {user_notification} = require("../controllers/user_notification")
const {current_bids} = require("../controllers/current_bids")
const { editProfile,postEditProfile } = require("../controllers/edit_profile");


route.get("/profile/:id", profile);
route.get("/update/profile/:id", editProfile);
route.post("/update/profile",postEditProfile)
route.get("/dashboard",nav_bar)
route.get("/live_auction",live_auction)
route.get("/upcoming_auction",upcoming_auction)
route.get("/product_details",product_details)
route.get("/user_profile",user_profile)
route.get("/user_notification",user_notification)
route.get("/current_bids",current_bids)

module.exports = route;
