module.exports = function ({ AlertService }) {
    const expression = "0/15 * * * * *";
    const task =  () => {
        AlertService.processDelayedMetrics()
    }

    return { expression, task };
}