var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PetSchema = new mongoose.Schema({
    name: String,
    species: String,
    dateofbirth: Date,
    sex: String
})

PetSchema.plugin(mongoosePaginate)
const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet;