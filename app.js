const express = require('express');
const helmet = require('helmet');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const app = express();
const CronJob = require('cron');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const expressValidator = require('express-validator');
global.config = require('./modules/config');

// Connect to DB
// mongodb://mongodb_user:password@localhost:27017/mongodb_db
 mongoose.connect('mongodb://USERNAME:PASSWORD]@localhost:27017/DB' , { useMongoClient : true });
//  mongoose.connect('mongodb://127.0.0.1:27017/hdcom_hd724' , { useMongoClient : true});

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json({ type : 'application/json' }));
app.use(expressValidator());
app.use(express.json());

//helmet
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());

app.use('/public' , express.static('public'));

const apiRouter = require('./modules/routes/api');

//
// ///recaptcha
// app.post('/subscribe', async (req, res) => {
//     if (!req.body.captcha)
//         return res.json({ success: false, msg: 'Please select captcha' });
//
//     // Secret key
//     const secretKey = '6LcbOcwUAAAAAPv_Rc-1LmA3-n4hAJISCYFQVfaa';
//
//     // Verify URL
//     const query = stringify({
//         secret: secretKey,
//         response: req.body.captcha,
//         remoteip: req.connection.remoteAddress
//     });
//     const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
//
//     // Make a request to verifyURL
//     const body = await fetch(verifyURL).then(res => res.json());
//
//     // If not successful
//     if (body.success !== undefined && !body.success)
//         return res.json({ success: false, msg: 'Failed captcha verification' });
//
//     // If successful
//     return res.json({ success: true, msg: 'Captcha passed' });
// });
/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});*/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api' , apiRouter);


app.listen(config.port , () => {
    console.log(`Server running at Port ${config.port}`)
});
