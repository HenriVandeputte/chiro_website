var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var LidSchema = new Schema(
    {
        naam: {type: String, required: true},
        leeftijd: {type: Number, required: true},
    }
);





module.exports = mongoose.model('Leider', LeiderSchema);