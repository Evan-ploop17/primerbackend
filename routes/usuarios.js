const { Router } = require("express")

const { getUsers, putUsers, postUsers, deleteUsers, patchUsers } = require('../controllers/usuarios')

const router = Router()

router.get('/', getUsers)
router.put('/', putUsers)
router.post('/', postUsers)
router.delete('/', deleteUsers)
router.patch('/', patchUsers)

module.exports = router