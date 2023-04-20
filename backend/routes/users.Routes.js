const express = require('express')
const router = express.Router()
const { registerUser,loginUser, getDatos } = require('../controllers/user.Controller.js')
const { protect } = require('../middleware/auth.Middleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/userdata', protect, getDatos)

module.exports =router