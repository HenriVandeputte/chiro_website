var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var LeiderSchema = new Schema(
    {
        voornaam: {type: String, required: true},
        achternaam: {type: String, required: true},
        leeftijd: {type: Number, required: true},
        functie: {type: Schema.Types.ObjectId },


    }
);



LeiderSchema.virtual('naam').get(function (){
    return this.voornaam + ' ' + this.achternaam;
})

module.exports = mongoose.model('Leider', LeiderSchema);