const passport = require("passport");
const connection = require("../config/connection");
let JwtStrategy = require("passport-jwt").Strategy;
const envConf = require("../config/env");
let urlCheck;
const getToken = (req) => {
  const url = req.originalUrl;
  urlCheck = url;
  return req.cookies.access_token;
};

let opts = {};
opts.jwtFromRequest = getToken;
opts.secretOrKey = envConf.secret_key;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      let user = await connection.query(
        "select email,role,id from users where email=?",
        [jwt_payload.email]
      );

      if (urlCheck.includes(`${user[0][0].role}`)) {
        if (jwt_payload.role === user[0][0].role) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(err);
    }
  })
);
