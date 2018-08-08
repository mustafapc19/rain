var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Preference = require("./preference");
var ClientHistory = require("./history");
var Schema = mongoose.Schema;
var UserSchema = mongoose.Schema({
    /* _id: {
          type: mongoose.Schema.Types.ObjectId
      }, */
    username: {
        type: String,
        index: true
    },
    email: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    preference: {
        type: Schema.Types.ObjectId,
        ref: "Preference"
    },
    history: [{
        type: Schema.Types.ObjectId,
        ref: "ClientHistory"
    }]
});

var User = (module.exports = mongoose.model("User", UserSchema));

module.exports.createUser = function (newUser, callback) {
    console.log("create user entered");
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            preference = new Preference();
            preference.temp = 25;
            preference.moist = 90;
            preference.save();

            history = new ClientHistory();
            history.temp.push(25);
            history.moist.push(90);
            history.save();

            newUser.preference = preference._id;
            newUser.history = history._id;
            newUser.password = hash;

            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function (username, callback) {
    var query = {
        username: username
    };
    User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.updateState = function (userId, temperature, moist) {
    User.findById(userId, function (err, user) {
        if (err) throw err;
        if (!user) {
            console.log("User Id not found");
            return;
        }
        ClientHistory.update(user.history, temperature, moist);
    });
};

module.exports.updatePreference = function (userId, temperature, moist) {
    User.findById(userId, function (err, user) {
        if (err) throw err;
        if (!user) {
            console.log("User Id not found");
            return;
        }
        Preference.update(user.preference, temperature, moist);
    });
};

module.exports.getPreference = function (userId, callback) {
    User.findById(userId, function (err, user) {
        if (err) throw err;
        if (!user) {
            console.log("User Id not found");
            return;
        }
        // console.log("!!!!!!!!", user.preference, "!!!!!!!");
        /* Preference.findOne({
                _id: user.preference
            }, function (err, preference) {
                console.log('!!!!!', preference, '!!!!!!')
            }) */
        Preference.contains(user.preference, callback);
    });
};

module.exports.getClientHistory = function (userId, callback) {
    User.findById(userId, function (err, user) {
        if (err) throw err;
        if (!user) {
            console.log("User Id not found");
            return;
        }
        return ClientHistory.contains(user.history, callback);
    });
};