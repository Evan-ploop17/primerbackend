const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");

exports.login = async (req, res = response) => {
    const { mail, password } = req.body
    try {

        // Verificar si el mail existe
        const user = await User.findOne({ mail })
        if(!user) {
            return res.status(400).json({
                msg: 'User / Password are not correct - mail'
            })
        }

        // Verificar si el usuario esta activo
        if(!user.state) {
            return res.status(400).json({
                msg: 'User / Password are not correct - state: false'
            })
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compareSync(password, user.password)
        if(!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are not correct - password'
            })
        }

        // Generar el JWT
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        })
        
    }
}