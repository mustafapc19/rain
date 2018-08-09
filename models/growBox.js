var mongoose = require('mongoose')
var GrowBoxSchema = mongoose.Schema({
    id: {
        type: Array
    }
})
var GrowBox = module.exports = mongoose.model('GrowBox', GrowBoxSchema)

module.exports.update = function (growBoxId, id) {

    GrowBox.findById(growBoxId, function (err, history) {
        if (err) throw err

        history.temp.push(id)

    })
}

module.exports.contains = function (histId, callback) {

    ClientHistory.findById(histId, callback)
}