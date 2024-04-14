const con = require("../config/connection");
const argon2 = require('argon2');
const rs = require('randomstring');
const activateLink = async (req,res)=>{
    let id = req.query.Id;
    let sql = `select modified_at from users where id = ${id}`;
    let result = await con.query(sql);
    result = result[0];
    let activatetime = new Date(result[0].modified_at);
    let currenttime = new Date();
    let difference = parseInt((currenttime - activatetime)/(1000*60))
    if(difference > 1){
        res.render("pages/regenerate")
    }
    else{
        res.render("pages/activation")
    }
}

const activatedLink = async (req,res)=>{
    let data = req.body;
    let password = data.password
    let id = req.query.Id;
    let confirmpassword = data.confirmpassword
    if(password == confirmpassword){
            let hashedpassword = await argon2.hash(password)
            let sql = `update users set password = '${hashedpassword}',activation_status = 1,modified_at = CURRENT_TIMESTAMP where id = ${id}`;
            let result = await con.query(sql);
            res.send({
                code:1,
                alert:'Password Set successfully'
            })
    }
}


const regenerateLink = async (req,res)=>{
    let Id = req.query.id;
    let activationlink = rs.generate(10);
    let sql = `update users set activation_code = '${activationlink}', modified_at = CURRENT_TIMESTAMP where id = ${Id}`;
    let result = await con.query(sql);
    console.log(result)
    res.json({
        message:"successfully regenerated", 
        id:Id,
        code:1,
        activationlink:activationlink,
    });
}

module.exports = {activateLink,activatedLink,regenerateLink};