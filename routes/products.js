/*
Program : products.js
Type : Router
Description : Handles all routes belongs to products page at seller panel
Auther : Vivek Kandoliya
*/

// ==== Node Modules ====

const express = require('express');
const multer = require('multer');
const fs = require("fs");

// ==== Local Modules ====
const controller = require('../controllers/products_controller');
const validators = require('../middlewares/form_validators');

// ==== Configration ====
const router = express.Router();


// Multer configuration
const storage =
 multer.diskStorage({
  destination: function (req, file, cb) {
    // Extract the folder names from request parameters
    // Specify the directory where files will be saved
    const uploadDir = path.join(
      __dirname,
      "images"
    );
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Specify the filename for the uploaded file
    cb(null, file.originalname);
  },
 });

 const upload = multer({ storage: storage });

// ==== Endpoints ======

// endpoint : products/form | login : requried | role : seller
router.get('/form', controller.form);

//endpoint : products/save | login : required | role : seller
router.post('/save', upload.array('product_images',5), validators.productValidator, controller.createNewProduct);




module.exports = router;

