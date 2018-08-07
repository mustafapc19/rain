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

module.exports.update = function (prefId, temp, moist) {

    Preference.findbyId(prefId, function (err, preferance) {
        if (err) throw err
        preferance.temp = temp
        preferance.moist = moist

    })
}
/* module.exports.createPreference(preferance,callback){

} */
module.exports.contains = function (prefId, callback) {

    Preference.findById(prefId, callback)
}