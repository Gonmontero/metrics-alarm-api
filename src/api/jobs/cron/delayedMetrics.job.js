module.exports = function ({ AlertService }) {
    const expression = "* * * * *";
    const task =  () => {
        AlertService.processDelayedMetrics()
    }

    return { expression, task };
}