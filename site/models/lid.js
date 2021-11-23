var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var LidSchema = new Schema(
    {
        naam: {type: String, required: true},
        leeftijd: {type: Number, required: true},
        groep: [{type: Schema.Types.ObjectId, ref: 'Groep', required: true}]
    }
);





module.exports = mongoose.model('Leider', LeiderSchema);