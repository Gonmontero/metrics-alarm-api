class StartUp {
    constructor({ server, JobManager }) {
        this._server = server;
        this._jobManager = JobManager
    }

    async start() {
        await this._server.start();
        this._jobManager.startJobs();
    }
}

module.exports = StartUp;