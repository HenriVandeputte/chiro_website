const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeiderSchema = new Schema(
    {
        voornaam: {type: String, required: true},
        achternaam: {type: String, required: true},
        leeftijd: {type: Number, required: true},
        groep: {
            type: String,
            required: true,
            enum: ['Zwoebers', 'Speelclub', 'Kwiks', 'Tippers', 'Tiptiens', 'Aspies', 'Hoofdleiding']
        },
        fotolink: {type: String, required: true}
    }
);

LeiderSchema.virtual('naam').get(function (){
    return this.voornaam + ' ' + this.achternaam;
})

LeiderSchema.virtual('url').get(function (){
    return 'leider/' + this.id ;
})

module.exports = mongoose.model('Leider', LeiderSchema);