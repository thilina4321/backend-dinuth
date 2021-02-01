const express = require('express')
const router = express.Router()

const lernesControler = require('../controller/lerners-operator')

router.post('/login', lernesControler.login)

module.exports = router
