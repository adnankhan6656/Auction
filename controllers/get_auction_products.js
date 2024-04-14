const db = require("../config/connection");
async function get_add_auction_products(req,res){
  try {
    console.log("jdjdj")
    // Get the current page and limit from the query parameters
    const page = parseInt(req.query.page) || 1;
    const limit =  4;

    // Calculate the offset for the SQL query
    const offset = (page - 1) * limit;
   

    // Find the selected products in the database with pagination
    const [totalrows] = await db.query('SELECT * FROM products');
    console.log(totalrows.length);
    const [rows] = await db.query('SELECT * FROM products LIMIT ?,?', [offset, limit]);

    
    res.json({
      products: rows,
      currentPage: page,
      totalPages: Math.ceil(totalrows.length / limit)
    });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).send('Error fetching selected products');
  }
}

module.exports={get_add_auction_products};