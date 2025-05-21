const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../databse/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.userPath = '/api/usuarios'
        this.authPath = '/api/auth'

        // DB
        this.connectDB()
        // Middlewares
        this.middlewares()
        // Rutas
        this.routes()
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors())
        // Este es para que pueda recibir objetos en el body de las peticiones y las lea
        this.app.use(express.json())
        // Acceder a la carpeta publica
        this.app.use(express.static('public'))
    }
    
    routes() {
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.userPath, require('../routes/usuarios'))
    }
    
    listen() {
        this.app.listen( this.port, () => {
            console.log(`Corriendo en puerto ${this.port}`)
        })
    }
}

module.exports = Server