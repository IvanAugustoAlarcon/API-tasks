const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { errorHandler } = require('./middleware/error.Middleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api/tareas', require('./routes/tareas.Routes'))
app.use('/api/users', require('./routes/users.Routes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server iniciado en el puerto ${port}`))