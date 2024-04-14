/*
Program : query_generator.js
Type : Functions
Description : Contains all SQL Query Generator Functions
Auther : Vivek Kandoliya, 
*/


// ==== Node Modules ====

// ==== Local Modules ====

// ==== Configration ====


// ==== Functions =====

function generateQuery(fields, values) {
  try{
    var fields_part = "";
    var values_part = "";
  
    for (let i = 0; i < values.length; i++) {
      if (values[i] !== '') {
        fields_part += `,${fields[i]} `;
        values_part += `,? `;
      }
    }
    fields_part = fields_part.slice(1);
    values_part = values_part.slice(1);
    let sqlquery = `${fields_part} ) values ( ${values_part} );`
    // console.log("sqlqey",sqlquery);
    return sqlquery;
  }
  catch(error){
    console.log('touched : common/query_generator -> generateQuery')
    console.log(error);
    return res.render('pages/error_page');
  }
  
}


module.exports = {generateQuery}