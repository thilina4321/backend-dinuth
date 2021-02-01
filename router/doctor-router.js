const express = require('express')
const router = express.Router()

const doctorControler = require('../controller/doctor')

router.post('/login', doctorControler.login)

module.exports = router
