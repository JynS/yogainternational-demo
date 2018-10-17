/*jshint esversion: 6 */
var express = require('express');
var path = require('path');
var app = express();

var index = require('./routes/index');
app.disable("x-powered-by");

// ---------- routing, view engine, and middleware ---------- \\

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ---------- error handlers ---------- \\

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        winston.log('error','%s, pid=%d', err.stack, process.pid);
    });
}


module.exports = app;
