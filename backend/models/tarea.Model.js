const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    texto: {
        type: String,
        required: [true, 'Teclea una tarea']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Tarea', tareaSchema)