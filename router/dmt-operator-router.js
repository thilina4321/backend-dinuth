const express = require('express')
const router = express.Router()

const dmtAdminControler = require('../controller/dmt-admin')

router.post('/signup', dmtAdminControler.signup)
router.post('/login', dmtAdminControler.login)
router.post('/create-doctor', dmtAdminControler.createDoctor)
router.post('/create-lab', dmtAdminControler.createLabOperator)
router.post('/create-lernes', dmtAdminControler.createLernersOperator)

module.exports = router
