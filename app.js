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
var history = require('./routes/api/history')
var presentState = require('./routes/device/presentState')
var userPresentState = require('./routes/api/presentState')



app.use('/user/login', login)
app.use('/user/register', register)
app.use('/user/api/preference', preference)
app.use('/user/api/history', history)
app.use('/user/api/presentstate', userPresentState)

app.use('/ard', aurdinoreport)
app.use('/ard/presentstate', presentState)



app.listen(1234)