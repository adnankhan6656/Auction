const logger = require("./logger");
const con = require("../config/connection");
const user_dashboard = async (req, res) => {
    let sql = `select id,title,image,description,starting_time,ending_time from auctions where status = 'Live' LIMIT 3`;
    let result = await con.query(sql);
    let liveauctionData = result[0];
    sql = `select id,title,image,description,starting_time,ending_time from auctions where status = 'incoming' LIMIT 3`;
    result = await con.query(sql);
    let incomingAuctionDetails = result[0]
    res.render("pages/user_dashboard.ejs",{liveauctionData,incomingAuctionDetails});
}

module.exports = {user_dashboard}