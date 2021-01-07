const express = require('express')
const router = express.Router()

const instructorController = require('../controller/instructor')

router.post('/signup', instructorController.signup)
router.post('/login', instructorController.login)

module.exports = router
