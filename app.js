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
var login = require('./routes/user/login')
var register = require('./routes/user/register')
var preference = require('./routes/api/preference')



app.use('/user/login', login)
app.use('/user/register', register)
app.use('/user/api/preference', preference)


app.use('/ard', aurdinoreport)



app.listen(1234)