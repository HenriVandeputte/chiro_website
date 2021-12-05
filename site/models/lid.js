const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const lidSchema = new Schema(
    {
        voornaam: {type: String, required: true},
        achternaam: {type: String, required: true},
        email: {type: String, required: true},
        leeftijd: {type: Number, required: true}
    });



lidSchema.virtual('naam').get(function (){
    return this.voornaam + ' ' + this.achternaam;
})

module.exports = mongoose.model('Lid', lidSchema);

