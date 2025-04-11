const User = require('../models/user.js')
const bcryptjs = require('bcryptjs')

exports.getUsers = async (req, res) => {

    // Agregamos validacion para que solamente encuentre usuarios que esten activos 
    const validation = {state: true}
    const { limit = 5, from = 0 } = req.query

    // Estos dos lamados sirven tambien pero son mas lentos
    // el promise.all o el .allSettled ejecutan los llamados de manera simultanea, lo hace mas eficiente
    
    // const users = await User.find(validation)
    //     .skip(Number(from))
    //     .limit(Number(limit))
    
    // const allRecords = await User.countDocuments(validation)

    const [ allRecords, users ] = await Promise.allSettled([
        User.countDocuments(validation),
        User.find(validation)
        .skip(Number(from))
        .limit(Number(limit))
    
    ])

    const { value: allRecordsFields } = allRecords
    const { value: arrUsers } = users

    res.json({
        allRecordsFields,
        arrUsers
    })
}
exports.putUsers = async (req, res) => {
    const { id } = req.params
    const { _id, password, google, mail, ...rest } = req.body

    if(password) {
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt)
    }
    const user = await User.findByIdAndUpdate(id, rest)

    res.json(user)
}

exports.postUsers = async (req, res) => {

    const { body: { name, mail, password, role }} = req

    const user = new User({ name, mail, password, role })
    console.log('llega aca');
    
    //Encriptar la contraseña 
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()
    res.json({
        msg: 'post',
        user
    })
}

exports.deleteUsers = async (req, res) => {

    const { id } = req.params
    //  Asi se elimina un usuario de la base de datos. NO se recomienda porque perderiamos la integridad referencial
    // En su lugar cambiaremos el estado del usuario
    // const user = await User.findByIdAndDelete(id)

    const user = await User.findByIdAndUpdate(id, {state: false })
    res.json(user)
}

exports.patchUsers = (req, res) => {
    res.json({
        msg: 'patch '
    })
}