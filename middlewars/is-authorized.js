const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const config = require("../config");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-p3u6u54lrh2rqsz8.uk.auth0.com/.well-known/jwks.json",
  }),
  audience: config.AUTH0.API_AUDIENCE,
  issuer: config.AUTH0.ISSUER_BASE_URL,
  algorithms: ["RS256"],
});

module.exports = jwtCheck;
