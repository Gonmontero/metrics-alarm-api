const { DateTime } = require('luxon');
const { AlertEntity } = require('../entities')
const mapper = require('../mappers')

class AlertRepository {

    async createAlert(alert) {
        const alertEntity = new AlertEntity(mapper.toDBEntity(alert))

        try {
            var created = await alertEntity.save()
            return created;
        } catch (e) {
            throw e
        }
    }

    async updateAlert(alert) {
        try {
            const { Id } = alert
            var updated = await AlertEntity.findOneAndUpdate({ _id: Id }, mapper.toDBEntity(alert))
            return updated;
        } catch (e) {
            throw e
        }
    }

    async getAlert(alertId) {
        try {
            const alert = await AlertEntity.findById(alertId)
            if (!alert) {
                return null;
            }

            return alert;
        } catch (e) {
            throw e
        }
    }

    async getAllDelayedAlerts() {
        var time = DateTime.now();
        var delayedAlerts = {};

        try {
            await AlertEntity.find({ "nextExecution": { "$lte": time.toJSDate() }, "active": true }, function (err, results) {

                results.forEach(function (alert) {
                    delayedAlerts[alert._id] = alert;
                });
            });
        } catch (e) {
            throw e
        }

        return delayedAlerts;
    }
}

module.exports = AlertRepository