const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (role = '') => { 

    const existRole = await Role.findOne({ role })
    console.log('existRole', existRole)
    if(!existRole) {
        throw new Error(`The role: ${role} does not exist on database`) 
    }
}

// Verificar si correo existe
const validateExistMail = async (mail) => {
    console.log('mail', mail)
    const existMail = await User.findOne({mail})
    if(existMail) throw new Error(`The mail: ${mail} alrayde exist on database`)
}

const validateUserById = async (id) => {
    console.log('id', id)
    const existId = await User.findById(id)
    if(!existId) throw new Error(`The user with id ${id} doesn't exist`) 
}

module.exports = {
    isValidRole,
    validateExistMail,
    validateUserById
}