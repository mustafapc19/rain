var mongoose = require('mongoose')
var PreferenceSchema = mongoose.Schema({
    /*     _id: {
            type: mongoose.Types.ObjectId
        }, */
    temp: {
        type: Number
    },
    moist: {
        type: Number
    }
})
var Preference = module.exports = mongoose.model('Preference', PreferenceSchema)

module.exports.update = function (prefId, update, callback) {

    Preference.findById(prefId, function (err, preferance) {
        if (err) {
            callback(false)
        }
        preferance.temp = update.temp
        preferance.moist = update.moist
        preferance.save()
        callback(true)

    })
}
/* module.exports.createPreference(preferance,callback){

} */
module.exports.contains = function (prefId, callback) {
    Preference.findById(prefId, callback)
}