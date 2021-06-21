class HealthController {
    constructor() { }

    ping(req, res) {
        return res.send({ message: "pong" })
    }
}

module.exports = HealthController;