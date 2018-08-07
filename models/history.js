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

module.exports.update = function (histId, temp, moist) {

    ClientHistory.findById(histId, function (err, history) {
        if (err) throw err

        history.temp.push(temp)
        history.moist.push(moist)

    })
}

module.exports.contains = function (histId, callback) {

    ClientHistory.findById(histId, callback)
}