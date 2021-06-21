class NotificationService {
    constructor({ NotificationStrategyManager }) {
        this._strategyManager = NotificationStrategyManager
    }

    async notify(alert, errors) {
        const { name, notification } = alert
        for (var i in notification) {
            const strategy = this._strategyManager.getStrategy(notification[i].type)
            const data = notification[i].data;;
            try {
                strategy.notify(name, data, errors)
            } catch (err) {
                console.error(`Error on notifying ${notification[i].type}`);
                console.error(err);
            }
        }
    }
}

module.exports = NotificationService;