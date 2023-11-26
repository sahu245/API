const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

// user controller 
router.get('/getalluser',UserController.getalluser)
router.post('/userinsert',UserController.userinsert)



module.exports = router