const emailClient = require('../../email/client')

class EmailStrategy {
    constructor() {
        this._name = "email"
    }

    notify(name, data, errors) {
        const { recipient } = data;
        const subject = `Alert notification for Metric: ${name}`;
        var text = "The following metrics have failed to pass validation: ";

        errors.forEach(error => {
            text += error;
        });
        
        emailClient.sendEmail(recipient, subject, text)
    }
}

module.exports = EmailStrategy;