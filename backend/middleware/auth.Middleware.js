const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.Model')

const protect = asyncHandler( async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //obtener el token del encabezado
            token = req.headers.authorization.split(' ')[1]
            //verificar la firma del token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //obtener el usuario del token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }catch (e){
            console.log(e)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Acceso no autorizado no se recibio ningun token')
    }
})

module.exports = {
    protect
}