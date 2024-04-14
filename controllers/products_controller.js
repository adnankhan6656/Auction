/*
Program : products_controller.js
Type : Controller
Description : Handles all controller functions belongs to products page at seller panel
Auther : Vivek Kandoliya
*/


// ==== Node Modules ====
const { validationResult } = require('express-validator');


// ==== Local Modules ====
const promisePool = require('../config/connection');
const queryGenerators = require('../common/query_generator');
const validators = require('../middlewares/form_validators');
const { response } = require('express');
const { Result } = require('postcss');


// ==== Configration ====


// ==== Functions =====

//Function - form : renders product form
const form = async (req, res) => {
  try {

    const data = await promisePool.query('select * from categories');
    const categories = data[0];
    console.log(categories[0]);
    res.render('product/pages/product_form', { categories });
  }
  catch (error) {
    console.log('error touched at : products_controller/form')
    console.log(error);
    return res.render('pages/errorPage');
  }
}

//Function - createNewProduct : handles submition of new product form
const createNewProduct = async (req, res) => {
  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // in case request params meet the validation criteria
      return res.status(422).json({msg:'backend validation failed',err: errors})
    }

    console.log('data', req.body);
    const formData = req.body;

    const id = await insertProduct(formData);
    insertParameters(formData, id)

  }
  catch (error) {
    console.log('error touched at : products_controller -> createNewProduct')
    console.log(error);
    return res.render('pages/errorPage');
  }
}

//Function - insertProduct : Inserts product into prodcts table
async function insertProduct(data){
  try {
    const {product_name, category_id, description, product_condition} = data;
    const fields = ['product_name','category_id','description','product_condition','status'];
    const values = [product_name, parseInt(category_id), description, product_condition, 'unsold'];
    let sqlquery = 'insert into products (';
    sqlquery += queryGenerators.generateQuery(fields, values);
    const result = await promisePool.query(sqlquery,values);
    return result[0].insertId;
  }
  catch (error) {
    console.log('error touched at : products_controller -> insertProduct')
    console.log(error);
    return res.render('pages/errorPage');
  }
}

async function insertParameters(data, id){

  try {
    const parameter_names = data.parameter_name;
    const parameter_values = data.parameter_value;
  
    if(!parameter_names.length == parameter_values.length){
      return res.send(422).json({error: 'parameter length not matching'});
    }
  
    const length = parameter_names.length;
    for(let i=0; i<length; i++){
      if(parameter_names[i] != '' && parameter_values[i] != ''){
        const fields = ['product_id', 'parameter_name', 'parameter_value'];
        const values = [id, parameter_names[i], parameter_values [i]];
        
        let sqlquery = 'insert into parameters ('
        sqlquery += queryGenerators.generateQuery(fields, values);
        const result = await promisePool.query(sqlquery, values);
        console.log(sqlquery);
        console.log(result);
      }
    }
  }
  catch (error) {
    console.log('error touched at : products_controller -> insertParameters')
    console.log(error);
    return res.render('pages/errorPage');
  }
 
}

module.exports = { form, createNewProduct }