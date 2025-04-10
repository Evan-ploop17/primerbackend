const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is necesary'],
    },
    mail: {
        type: String,
        required: [true, 'The mail is necesary'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'The password is necesary'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    },
})

// Sobre escribe el metodo que usan mongoose y evitamos que retorne __v y la contraseña 
UserSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject()
    return user
}

module.exports = model('user', UserSchema)