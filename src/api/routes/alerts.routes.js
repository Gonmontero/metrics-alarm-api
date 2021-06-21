const { Router } = require("express");

module.exports = function({ AlertController }) {
    const router = Router();

    router.post("/", AlertController.createAlert.bind(AlertController));
    router.post("/:id/metric", AlertController.processMetrics.bind(AlertController));
    
    return router;
}