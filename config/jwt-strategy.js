const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./index');

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
opts.issuer = config.JWT_ISSUER;
opts.audience = config.JWT_AUDIENCE;
// opts.algorithms = ["RS256"];

const jwtStrategy = new JwtStrategy(opts, function(payload, done) {
  return done(null, payload);
});


module.exports = jwtStrategy;
