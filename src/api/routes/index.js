const { Router } = require("express")
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require("compression");

module.exports = function ({ AlertRoutes, HealthRoutes }) {
    const router = Router()
    const apiRoute = Router()

    apiRoute
        .use(cors())
        .use(bodyParser.json())
        .use(compression());

    apiRoute.use("/alert", AlertRoutes)
    apiRoute.use("/ping", HealthRoutes)
    router.use("/api", apiRoute)

    router.use((err, req, res, next) => {
        var { message } = err
        console.error(err.stack);
        res.status(500).send({
            Message: err.message,
        });
    });

    return router;
}