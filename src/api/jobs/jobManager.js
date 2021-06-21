const cronJob = require('node-cron')

class JobManager {
    constructor({ delayedMetrics }) {
        this._tasksParams = [ delayedMetrics ]
        this._runningTasks = []
    }

    async startJobs() {
        for (var i in this._tasksParams) {
            const { expression, task } = this._tasksParams[i];
            
            const newTasks = cronJob.schedule(expression, task)
            this._runningTasks.push(newTasks);
        }
    }
}

module.exports = JobManager