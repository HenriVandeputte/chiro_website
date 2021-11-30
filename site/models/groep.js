var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var GroepSchema = new Schema(
    {
        naam: {type: String, required: true },
        leeftijd: {type: Array },
        leiding: [{type: Schema.Types.ObjectId, ref: 'Leider'}],
        leden: [{type: Schema.Types.ObjectId, ref: 'Lid'}],
    }
)

GroepSchema.virtual('url').get(function (){
    return 'catalog/groep/' + this._id;
})


module.exports = mongoose.model('Groep', GroepSchema);