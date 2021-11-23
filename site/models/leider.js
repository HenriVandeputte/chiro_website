var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var LeiderSchema = new Schema(
    {
        naam: {type: String, required: true},
        leeftijd: {type: Number, required: true},
        gsmnummer: {type: String, required: true},
        groep: [{type: Schema.Types.ObjectId, ref: 'Groep', required: true}]

    }
);





module.exports = mongoose.model('Leider', LeiderSchema);