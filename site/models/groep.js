const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroepSchema = new Schema(
    {
        naam: {type: String, required: true},
        leeftijd: {type: Array},
        leeftijdString: {type: String},
        leiding: [{type: Schema.Types.ObjectId, ref: 'Leider'}],
        leden: [{type: Schema.Types.ObjectId, ref: 'Lid'}],
        orde: {type: String},
        beschrijving: {type: String}
    }
);

GroepSchema.virtual('url').get(function (){
    return '/groepen/' + this._id;
})

GroepSchema.virtual('image').get(function (){
    return '/images/logos/' + this.naam + '.png';
})

module.exports = mongoose.model('Groep', GroepSchema);