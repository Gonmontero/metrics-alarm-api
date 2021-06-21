const { asClass, createContainer, asFunction, asValue, InjectionMode } = require("awilix");

const StartUp = require("./startup");
const Server = require("./server");

const { AlertController, HealthController } = require("./controllers")
const JobManager = require("./jobs/jobManager")
const { delayedMetrics } = require("./jobs/cron")
const Routes = require("./routes")
const AlertRoutes = require('./routes/alerts.routes')
const HealthRoutes = require('./routes/health.routes')
const config = require('../config/environments')
const { AlertService, NotificationService } = require("../service")
const { AlertRepository } = require('../dao/repository')
const { NotificationStrategyManager, EmailStrategy } = require('../strategy')

const container = createContainer();

container.register({
    app: asClass(StartUp).singleton(),
    server: asClass(Server).singleton()
})
.register({
    router: asFunction(Routes).singleton()
})
.register({
    config: asValue(config)
})
.register({
    AlertRoutes: asFunction(AlertRoutes).singleton()
})
.register({
    HealthRoutes: asFunction(HealthRoutes).singleton()
})
.register({
    AlertService: asClass(AlertService).singleton()
})
.register({
    NotificationService: asClass(NotificationService).singleton()
})
.register({
    AlertRepository: asClass(AlertRepository).singleton()
})
.register({
    AlertController: asClass(AlertController).singleton()
})
.register({
    HealthController: asClass(HealthController).singleton()
})
.register({
    NotificationStrategyManager: asClass(NotificationStrategyManager).singleton()
})
.register({
    EmailStrategy: asClass(EmailStrategy).singleton()
})
.register({
    JobManager: asClass(JobManager).singleton()
})
.register({
    delayedMetrics: asFunction(delayedMetrics).singleton()
})


module.exports = container;
