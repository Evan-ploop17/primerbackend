const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        // Middlewares
        this.middlewares()
        // Rutas
        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        // Este es para que pueda recibir objetos en el body de las peticiones y las lea
        this.app.use(express.json())
        // Acceder a la carpeta publica
        this.app.use(express.static('public'))
    }
    
    routes() {
        this.app.use('/api/usuarios', require('../routes/usuarios'))
    }
    
    listen() {
        this.app.listen( this.port, () => {
            console.log(`orriendo en puerto ${this.port}`)
        })
    }
}

module.exports = Server