var mongoose = require('mongoose')

var Schema = mongoose.Schema;





module.exports = mongoose.model('Groep', Schema(
    {
            _id: Schema.Types.ObjectId,
            naam: {type: String, required: true},
            leeftijd: {type: Array, required: true},
            leider: [{type: Schema.Types.ObjectId, ref: 'Leider'}],
            leden: [{type: Schema.Types.ObjectId, ref: 'Lid'}],
    }
));