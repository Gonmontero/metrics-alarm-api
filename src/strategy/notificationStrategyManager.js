const strategy = require(".");

class NotificationStrategyManager {
    constructor({ EmailStrategy }) {
        this._strategies = [ EmailStrategy ]
    }

    addStrategy(strategy) {
        this._strategies = [...this._strategies, strategy];
    }

    getStrategy(name) {
        return this._strategies.find(strategy => strategy._name === name);
    }
}

module.exports = NotificationStrategyManager