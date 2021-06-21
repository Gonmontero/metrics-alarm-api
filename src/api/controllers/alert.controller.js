class AlertController {
    constructor({ AlertService }) {
        this._alertService = AlertService;
    }

    async createAlert(req, res) {
        const { body } = req;
        try {
            const alert = await this._alertService.createAlert(body)

            return res.send({
                id: alert.id,
                name: alert.name
            });
        } catch (err) {
            return res.status(500).send({
                result: err.message
            });
        }
    }

    async processMetrics(req, res) {
        const { body } = req;
        const { id } = req.params;
        try {
            const result = await this._alertService.evaluateMetrics(id, body)

            return res.send({
                result: result
            });
        } catch (err) {
            return res.status(500).send({
                result: err.message
            });
        }
    }
}

module.exports = AlertController;