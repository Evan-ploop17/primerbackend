const jwt = require('jsonwebtoken');
const { response, request } = require('express');
const User = require('../models/user.js')

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No token in the request'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;

        const authenticatedUser = await User.findById(uid);
        if(!authenticatedUser) {
            return res.status(401).json({
                msg: 'Token not valid - user does not exist in DB'
            });
        }

        if(!authenticatedUser.state) {
            return res.status(401).json({
                msg: 'Token not valid - user state: false'
            });
        }

        req.authenticatedUser = authenticatedUser;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token not valid'
        });
    }
}

module.exports = {
    validateJWT
}