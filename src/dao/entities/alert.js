const mongoose = require('mongoose')

const alertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: true
    },
    expectedValues: {
        type: Array,
        required: true
    },
    muteRange: {
        type: Array,
        required: true
    },
    nextExecution: {
        type: Date,
        required: true
    },
    frecuence: {
        type: Number,
        required: true
    },
    maxDelay: {
        type: Number,
        required: true
    },
    notification: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

const Alert = mongoose.model('Alert', alertSchema)

module.exports = Alert