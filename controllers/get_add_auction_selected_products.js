const db = require("../config/connection");

async function getSelectedProducts(req, res) {
    try {
        console.log("called");
        // Get the selected product IDs from the request body
        let selectedProducts = req.body;
        let selectedProductIds =selectedProducts.map(product =>parseInt(product.id)); 

        console.log(selectedProductIds);  //[41,42,43,47,55]

        // Find the selected products in the database
        let[rows, fields] = await db.query('SELECT * FROM products WHERE id IN (?)', [selectedProductIds]);
        
        console.log(rows);

        // Send the selected products as a JSON response
        res.json({ products: rows });
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error(error);
        res.status(500).send('Error fetching selected products');
    }
}

module.exports = { getSelectedProducts };
