var mongoose = require('mongoose')
var HistorySchema = mongoose.Schema({
    /* _id: {
        type: mongoose.Schema.Types.ObjectId
    }, */
    temp: {
        type: Array
    },
    moist: {
        type: Array
    }
})
module.exports = ClientHistory = mongoose.model('ClientHistory', HistorySchema)

module.exports.update = function (histId, update, callback) {
    ClientHistory.findById(histId, function (err, history) {
        if (err) throw err
        if (!history) {
            callback(false)
        }
        if (history.temp == undefined || history.moist == undefined) {
            callback(false)
        } else {
            history.temp.push(update.temp)
            history.moist.push(update.moist)

            callback(true)
        }
    })
}

module.exports.contains = function (histId, callback) {

    ClientHistory.findById(histId, callback)
}