var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var GroepSchema = new Schema(
    {
        naam: {type: String, required: true},
        leeftijd: {type: Array, required: true},
        leider: [{type: Schema.Types.ObjectId, ref: 'Leider', required: true}],
        leden: [{type: Schema.Types.ObjectId, ref: 'Lid', required:true}],
        beschrijving: [{type: String, required: true}]
    }
)





module.exports = mongoose.model('Groep', LeiderSchema);