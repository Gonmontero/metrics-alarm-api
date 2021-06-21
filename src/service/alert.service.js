const { alertToDomainEntity } = require('../domain/mappers')
const { DateTime } = require("luxon");

class AlertService {
    constructor({ AlertRepository, NotificationService }) {
        this._alertRepository = AlertRepository;
        this._notificationService = NotificationService;
    }

    async getAlert(alertId) {
        const alertEntity = await this._alertRepository.getAlert(alertId);

        if (!alertEntity) {
            throw "Not Found"
        }
        const alert = alertToDomainEntity(alertEntity)
        console.log("alert found of Id " + alertId)

        return alert;
    }

    async createAlert(alert) {
        var alert = alertToDomainEntity(alert);
        const { frecuence } = alert
        alert.setNextExecution(DateTime.now(), frecuence);

        if (!this.#validate(alert)) {
            return null;
        }

        const createdAlert = await this._alertRepository.createAlert(alert);
        return createdAlert;
    }

    async evaluateMetrics(alertId, metrics) {
        var alert = await this.getAlert(alertId)

        var errors = this.#processMetrics(alert, metrics)

        this.#notify(alert, errors)

        var { frecuence } = alert;

        alert.setNextExecution(DateTime.now(), frecuence);

        this._alertRepository.updateAlert(alert);

        return errors;
    }

    async processDelayedMetrics() {
        console.log("Processing Delayed Metrics")

        var delayedAlerts = await this._alertRepository.getAllDelayedAlerts()
        for (var key in delayedAlerts) {
            const { name, nextExecution, maxDelay, frecuence } = delayedAlerts[key];

            if (this.#shouldNotify(delayedAlerts[key])) {
                var delayEvaluated = DateTime.fromJSDate(nextExecution).plus({minutes: maxDelay});
                var result = delayEvaluated.diffNow()
                if (result.milliseconds > 0) {
                    var error = `La metrica ${name} no se ha informado en los ultimos ${maxDelay} minutos`
                    this.#notify(delayedAlerts[key], error)

                    mutedAlert.setNextExecution(DateTime.fromISO(muteRange[index].to), frecuence)
                        
                    this._alertRepository.updateAlert(mutedAlert);
                }
            } else {
                var mutedAlert = alertToDomainEntity(delayedAlerts[key])
                const { muteRange } = mutedAlert;

                for (var index in muteRange) {
                    if (DateTime.now() > DateTime.fromISO(muteRange[index].to)) {
                        mutedAlert.setNextExecution(DateTime.fromISO(muteRange[index].to), frecuence)
                        
                        this._alertRepository.updateAlert(mutedAlert);
                        break;
                    }
                }
            }
        }
    }

    #notify(alert, errors) {
        if (errors.size === 0) {
            return;
        }

        if (this.#shouldNotify(alert)) {
            this._notificationService.notify(alert, errors)
        }
    }

    #validate(alert) {
        return true;
    }

    #shouldNotify(alert) {
        const { muteRange } = alert
        let notify = true;

        for (var i in muteRange) {
            var from = DateTime.fromISO(muteRange[i].from)
            var to = DateTime.fromISO(muteRange[i].to)
            var now = DateTime.now()

            if (from <= now && now <= to) {
                notify = false;
                break;
            }
        }

        return notify;
    }

    #processMetrics(alert, metricsPosted) {
        const { expectedValues } = alert
        const { metrics } = metricsPosted
        var map = new Map();
        const errors = []

        expectedValues.forEach(element => {
            var key = Object.keys(element)[0]
            var value = Object.entries(element)[0][1]
            map.set(key, value)
        });

        metrics.forEach(metric => {
            var metricResult = true;
            var expectedValue = map.get(metric.name)

            if (expectedValue) {
                switch (expectedValue.condition) {
                    case "!=":
                        metricResult = metric.value !== expectedValue.value
                        break;
                    case "=":
                        metricResult = metric.value === expectedValue.value
                        break;
                    case "<":
                        metricResult = metric.value < expectedValue.value
                        break;
                    case "<=":
                        metricResult = metric.value <= expectedValue.value
                        break;
                    case ">":
                        metricResult = metric.value > expectedValue.value
                        break;
                    case ">=":
                        metricResult = metric.value >= expectedValue.value
                        break;
                    default:
                        break;
                }

                map.delete(metric.name)

                if (!metricResult) {
                    errors.push("The metric " + metric.name + " has not the expected value: " + expectedValue.condition + " " + expectedValue.value + " .Current value: " + metric.value)
                }
            } else {
                errors.push("Unexpected metric reported: " + metric.name + ".Current value: " + metric.value)
            }

        })

        if (map.size > 0) {
            let missingMetrics = Array.from(map.keys());
            for (var key in missingMetrics) {
                errors.push("Missing report for metric: " + missingMetrics[key])
            }
        }

        console.log(errors)

        return errors;
    }
}

module.exports = AlertService;

