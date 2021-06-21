const { attributes } = require('structure');
const { DateTime } = require("luxon");

const Alert = attributes({
    Id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
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
        required: false
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
})(
    class Alert {
        isActive() {
            return this.active;
        }

        setNextExecution(time, frecuence) {
            
            this.nextExecution = DateTime.fromISO(time).plus({minutes: frecuence}).toJSDate();
        }
    }
);

module.exports = Alert;