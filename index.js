const express = require('express');
const cors = require('cors');
const sessions = require('express-session');
const authRouter = require('./src/routes/auth.route');
const { connect } = require('./src/services/connection');
require('dotenv').config();
const {env} = process;

const app = express();
const port = env.PORT || 3000;
const maxAge = 60 * 60 * 1000;

const corsOptions = {
    credentials: true,
    origin: true,
};

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const sessionObj = {
    secret: env.SESSION_SECRET_KEY,
    name : 'pm.sid',
    saveUninitialized: false,
    cookie: { maxAge, httpOnly: true},
    resave: false
}

if(env.NODE_ENV === 'production')
{
    app.set('trust proxy', 1);
    sessionObj.cookie.secure = true;
    sessionObj.cookie.sameSite = 'none';
}

app.use(sessions(sessionObj));

app.get('/', function (req, res) {
    req.session.id = '123'
    res.send('user ')
});

app.use('/auth', authRouter);

connect();

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});