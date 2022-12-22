const config = require("../config");

// const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// const checkJwt = auth({
//   audience: config.AUTH0.API_AUDIENCE,
//   issuerBaseURL: config.AUTH0.ISSUER_BASE_URL
// });

// module.exports = checkJwt;

const passport = require('passport');

module.exports = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (err, user, _info) => {

    if(err) {
      console.log(err);
      return next(err);
    }
    
    if(!user){
      return res.status(401).json({
        status: 'fail',
        errorList: [
          "Unauthenticated: You're not unauthenticated!"
        ]
      });
    }

    req.user = user;
    return next();

  })(req, res, next);
  
};
