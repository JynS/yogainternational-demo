/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', {root: __dirname + "/../views/"});
});

module.exports = router;
