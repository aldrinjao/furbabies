var express = require('express')

var router = express.Router()

// Getting the Pet Controller that we just created

var PetController = require('../../controllers/pets.controller');


// Map each API to the Controller FUnctions

router.get('/', PetController.getPets)

router.post('/', PetController.createPet)

router.put('/', PetController.updatePet)

router.delete('/:id',PetController.removePet)


// Export the Router

module.exports = router;