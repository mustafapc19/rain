var express = require('express')
var app = express()
var http = require('http')
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var databaseConfig = require('./config/database')

mongoose.connect(databaseConfig.address);

/* app.use(express.json())
 */
app.use(bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var aurdinoreport = require('./routes/aurdinoreport')
var userRoute = require('./routes/user')

/* app.use(bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
})); */

app.use('/', aurdinoreport)
app.use('/user', userRoute)

app.use('/ard', aurdinoreport)

//  app.post('/user', userRoute)

app.listen(1234)