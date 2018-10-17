/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var winston = require('winston');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Working');
});

module.exports = router;
