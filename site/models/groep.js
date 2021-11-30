var mongoose = require('mongoose')

var Schema = mongoose.Schema;



module.exports = mongoose.model('Groep', Schema(
    {
            naam: {type: String, required: true },
            leeftijd: {type: Array },
            leiding: [{type: Schema.Types.ObjectId, ref: 'Leider'}],
            leden: [{type: Schema.Types.ObjectId, ref: 'Lid'}],
    }
));