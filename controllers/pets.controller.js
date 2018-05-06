// Accessing the Service that we just created

var PetService = require('../services/pet.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getPets = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var pets = await PetService.getPets({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: pets, message: "Succesfully Todos Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createPet = async function(req, res, next){
    console.log("222");
    console.log(req.body);

    // Req.Body contains the form submit values.

    var pet = {
        name: req.body.name,
        species: req.body.species,
        sex: req.body.sex
    }

    

    try{
        
        // Calling the Service function with the new object from the Request Body
        console.log("success");
        var createdPet = await PetService.createPet(pet)
        return res.status(201).json({status: 201, data: createdPet, message: "Succesfully Created ToDo"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
}

exports.updatePet = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var pet = {
        id,
        name: req.body.name ? req.body.name : null,
        species: req.body.description ? req.body.species : null,
        sex: req.body.status ? req.body.sex : null
    }

    try{
        var updatedPet = await PetService.updatePet(pet)
        return res.status(200).json({status: 200, data: updatedPet, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removePet = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await PetService.deletePet(id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}