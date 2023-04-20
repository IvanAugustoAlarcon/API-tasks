const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tarea.Model')

const getTareas = asyncHandler( async (req, res) => {

    const tareas = await Tarea.find({user: req.user.id})

    res.status(200).json(tareas)
})

const setTareas = asyncHandler( async (req, res) => {
    // const mensaje = req.body.mensajes
    if(!req.body.texto){
        // res.status(404).json({message: 'Favor de poner algo'})
        res.status(404)
        throw new Error('Favor de poner algo')
    }

    const tarea = await Tarea.create({
        texto: req.body.texto,
        user: req.user.id
    })

    res.status(201).json(tarea)
})

const putTareas = asyncHandler( async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)

    if(!tarea) {
        res.status(400)
        throw new Error ('Tarea no encontrada')
    }

    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso no Autorizado, no puedes modificar esta tarea')
    }

    const tareaModificada = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(tareaModificada)
})

const deleteTareas = asyncHandler( async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)

    if(!tarea) {
        res.status(400)
        throw new Error ('Tarea no encontrada')
    }

    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso no Autorizado, no puedes eliminar esta tarea')
    }
    // await tarea.remove
    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id)
    res.status(200).json(tareaEliminada)
})

module.exports = {
    getTareas,
    setTareas,
    putTareas,
    deleteTareas
}