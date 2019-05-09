const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description: {
                type: String,
                required: true,
                trim: true
            },
            completed: {
                type: Boolean,
                default: false
            },
            owner: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
},{
    timestamps:true
})

const tasks = mongoose.model('tasks',taskSchema)

module.exports = tasks