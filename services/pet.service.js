// Gettign the Newly created Mongoose Model we just created 
var Pet = require('../models/pet.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getPets = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var pets = await Pet.paginate(query, options)
        
        // Return the pet list that was retured by the mongoose promise
        return pets;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Pet')
    }
}

exports.createPet = async function(pet){
    console.log(pet);
    
    // Creating a new Mongoose Object by using the new keyword
    var newPet = new Pet({
        name: pet.name,
        species: pet.species,
        sex: pet.sex
    })

    try{

        // Saving the Pet 
        var savedPet = await newPet.save()

        return savedPet;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating Pet")
    }
}

exports.updatePet = async function(pet){
    var id = pet.id

    try{
        //Find the old Pet Object by the Id
    
        var oldPet = await Pet.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Pet")
    }

    // If no old Pet Object exists return false
    if(!oldPet){
        return false;
    }

    console.log(oldPet)

    //Edit the Pet Object
    oldPet.name = pet.name
    oldPet.species = pet.species
    oldPet.sex = pet.sex


    console.log(oldPet)

    try{
        var savedPet = await oldPet.save()
        return savedPet;
    }catch(e){
        throw Error("And Error occured while updating the ");
    }
}

exports.deletePet = async function(id){
    
    // Delete the Pet
    try{
        var deleted = await Pet.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Pet Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Pet")
    }
}