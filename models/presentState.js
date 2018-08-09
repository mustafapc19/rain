var mongoose = require('mongoose')
var PresentStateSchema = mongoose.Schema({
    /*     _id: {
            type: mongoose.Types.ObjectId
        }, */
    temp: {
        type: Number
    },
    tempBackUp: {
        type: Number
    },
    moist: {
        type: Number
    },
    moistBackUp: {
        type: Number
    }
})
var PresentState = module.exports = mongoose.model('PresentState', PresentStateSchema)

module.exports.update = function (presId, update, callback) {

    PresentState.findById(presId, function (err, presentState) {
        if (err) {
            callback(false)
        }
        // console.log('temp & moist', temp, moist)

        PresentState.findByIdAndUpdate(presentState, update, function (err) {
            if (err) {
                callback(false)
            }
        })
        callback(true)

    })
}
/* module.exports.createPresentState(presentState,callback){

} */
module.exports.contains = function (presId, callback) {
    console.log('Present State Contains entered, presId:', presId)

    PresentState.findById(presId, callback)
}