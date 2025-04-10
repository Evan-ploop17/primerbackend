const { validationResult } = require('express-validator')

const validateFields = (req, res, next) => {
    const errors = validationResult(req)
    console.log('errors desde consola', errors)
    if (!errors.isEmpty())  {
        return res.status(400).json(errors)
    }
    next()
}

module.exports = {
    validateFields
}