var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var GroepSchema = new Schema(
    {
        naam: {type: String, required: true},
        leeftijd: {type: Array, required: true},
        leider: [{type: Schema.Types.ObjectId, ref: 'Leider'}],
        leden: [{type: Schema.Types.ObjectId, ref: 'Lid'}],
    }
)

var Kwiks = new GroepSchema({ name: Kwiks, leeftijd: [10,11,12], leider})



module.exports = mongoose.model('Groep', LeiderSchema);