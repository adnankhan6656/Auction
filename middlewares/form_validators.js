/*
Program : form_validators.js
Type : Middleware
Description : Contains validations for forms
Auther : Vivek Kandoliya
*/ 


// ==== Node Modules ====
const {body} = require('express-validator');

// ==== Local Modules ====
const promisePool = require('../config/connection');

// ==== Configration ====


// ==== Functions =====

// Product Validator
const productValidator = [
  body('product_name','Product Name can not be Empty').not().isEmpty(),
  body('category_id','Category Id can not be empty').not().isEmpty(),
  body('description','Description can not be empty').not().isEmpty(),
  body('product_condition','Product condiion can not be dempty').not().isEmpty()
] 

const productParameterValidator = [
  body('parameter_name').isArray().not().isEmpty(),
  body('parameter_value').isArray().not().isEmpty()
]

module.exports = { productValidator, productParameterValidator }