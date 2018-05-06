var express = require('express')

var router = express.Router()
var todos = require('./api/pets.route')


router.use('/pets', todos);


module.exports = router;