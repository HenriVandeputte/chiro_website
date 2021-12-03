var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var lidSchema = new Schema(
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

