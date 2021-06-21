const { Alert } = require('../../domain');

module.exports = {
    alertToDomainEntity(alert) {
        var Id = 0;
        const { _id, name, active, expectedValues,
            muteRange, nextExecution,
            frecuence, maxDelay, notification } = alert;

        if (_id != null) {
            Id = _id.toString();
        }


        return new Alert({
            Id, name, active, expectedValues,
            muteRange, nextExecution,
            frecuence, maxDelay, notification
        });
    }
}