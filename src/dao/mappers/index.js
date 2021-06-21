module.exports = {
    toDBEntity(alert) {
        const { name, active, expectedValues,
            muteRange, nextExecution,
            frecuence, maxDelay, notification } = alert;

        return { name, active, expectedValues,
            muteRange, nextExecution,
            frecuence, maxDelay, notification };
    }
}