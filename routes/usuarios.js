const { check } = require('express-validator')
const { getUsers, putUsers, postUsers, deleteUsers, patchUsers } = require('../controllers/usuarios')
const { isValidRole, validateExistMail, validateUserById } = require('../helpers/db-validators')
const { Router } = require("express")
const { validateFields, validateJWT, hasRole, isAdminRole } = require("../middleware/index")

const router = Router()

router.get('/', getUsers)

router.put('/:id', [
    check('id', 'Its not an valid id').isMongoId(),
    check('id').custom(validateUserById),
    check('role').custom(isValidRole),
    validateFields
], putUsers)

router.post('/', [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('password', 'This is not a valid password').isLength({min: 6}),
    check('mail', 'This is not a valid mail').custom(validateExistMail).isEmail(),
    check('role').custom(isValidRole),
    validateFields
], postUsers)

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'Its not an valid id').isMongoId(),
    check('id').custom(validateUserById),
    validateFields
], deleteUsers)

router.patch('/', patchUsers)

module.exports = router