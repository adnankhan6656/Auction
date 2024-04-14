const logger = require("./logger")

const get_add_auction = (req,res) =>{
    let seller_id=req.user[0][0].id;
    console.log(seller_id)
    res.render('pages/add_auctions',{id:seller_id})
}

const post_add_auctions = (req,res) =>{
    logger.info(req.body);
    res.send("Data");
}

module.exports = {get_add_auction,post_add_auctions}