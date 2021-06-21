const { Router } = require("express");

module.exports = function({ HealthController }) {
    const router = Router();

    router.get("/", HealthController.ping);

    return router;
}