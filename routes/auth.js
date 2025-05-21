const { Router } = require("express")
const { check } = require('express-validator')
const { login } = require("../controllers/auth")
const { validateFields } = require("../middleware/validateFields")


const router = Router()

router.post('/login', [
    check('mail', 'The mail is mandatory').isEmail(),
    check('password', 'The password is mandatory').not().isEmpty(),
    validateFields
], login)


module.exports = router