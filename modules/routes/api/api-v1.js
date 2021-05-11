const express = require('express');
const router = express.Router();
//setting routes***********************************

const users = require('./routeUsers');
router.use('/users',users);
const admin = require('./routerAdmin');
router.use('/admin', admin);


module.exports = router;
