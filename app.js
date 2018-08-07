var express = require('express')
var app = express()
var http = require('http')
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/ardtemp');

var aurdinoreport = require('./routes/aurdinoreport')
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', aurdinoreport)

app.use('/ard', aurdinoreport)

//  app.post('/user', userRoute)

app.listen(1234)