const express = require('express')
const router = express.Router()

const applicantControler = require('../controller/applicant')

router.post('/signup', applicantControler.signup)
router.post('/login', applicantControler.login)

module.exports = router
