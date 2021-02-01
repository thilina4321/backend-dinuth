const express = require('express')
const router = express.Router()

const labControler = require('../controller/lab-operator')

router.post('/login', labControler.login)

module.exports = router
