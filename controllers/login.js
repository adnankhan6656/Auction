const connection = require("../config/connection");
const envConf = require("../config/env");
const jwt = require("jsonwebtoken");

exports.loginUser = (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  const getEmail = async () => {
    const dbEmail = await connection.query(
      "select email,role from users where email=?;",
      [email]
    );
    if (!dbEmail[0].length) {
      res.send({ error: true });
    } else {
      getPassword(dbEmail[0][0].role);
    }
  };
  const getPassword = async (role) => {
    const dbPassword = await connection.query(
      "select password from users where email=?;",
      [email]
    );
    if (dbPassword[0][0].password === password) {
      const user = {
        email: email,
        role: role,
      };
      const token = jwt.sign(user, envConf.secret_key);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send({ error: false, role: `${role}` });
    } else {
      res.send({ error: true });
    }
  };

  getEmail();
};
