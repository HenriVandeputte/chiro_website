var mongoose = require('mongoose')

var Schema = mongoose.Schema;

module.exports = mongoose.model('Lid', Schema(
    {
        naam: {type: String, required: true},
        geboorteDatum: {type: Date}
    }
));