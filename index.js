// index.js

const config = require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const { auth } = require('express-openid-connect');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const APIRoute = require('./routes/api/v1');
// const authRoute = require('./routes/auth/index');

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: config.AUTH0.SECRET,
  baseURL: config.AUTH0.BASE_URL,
  clientID: config.AUTH0.CLIENT_ID,
  issuerBaseURL: config.AUTH0.ISSUER_BASE_URL,
  clientSecret: config.AUTH0.CLIENT_SECRET,
  authorizationParams: {
    response_type: 'code',
    audience: config.AUTH0.API_AUDIENCE,
    scope: 'openid profile email'
  }
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authConfig));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  return res.status(400).json({
    ...(req.oidc.user),
    auth: req.oidc.accessToken
  });
});

// API Routes
app.use('/api/v1', APIRoute);

app.use(express.static(path.join(__dirname, "client", "build")));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(config.PORT, () => {
  console.log(`listening to clients @localhost:${config.PORT}`);
});

