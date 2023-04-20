const express = require('express')
const { getTareas, deleteTareas, setTareas, putTareas } = require('../controllers/tarea.Controller.js')
const router = express.Router()
const { protect } = require('../middleware/auth.Middleware')

router.route('/').get(protect, getTareas).post(protect, setTareas)
// router.get('/', getTareas)
// router.post('/', setTareas)
router.route('/:id').put(protect, putTareas).delete(protect, deleteTareas)
// router.put('/:id', putTareas)
// router.delete('/:id', deleteTareas)


module.exports =router