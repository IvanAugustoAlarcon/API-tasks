const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.Model')

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if(!email || !password){
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})

const registerUser = asyncHandler ( async (req,res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error ( 'Favor de verificar todos los campos' )
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error ( 'Email ya esta registrado' )
    }
    //hash al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //crear usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    //Mandamos la respuesta de la funcion 
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }else {
        res.status(400)
        throw new Error('No se pud crear el usuario')
    }
    res.json({message: 'Registrar Usuario'})
})

const getDatos = asyncHandler ( async (req,res) => {
    res.json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = { 
    registerUser,
    loginUser,
    getDatos
 }