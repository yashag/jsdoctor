const Gaze = require('gaze').Gaze;
const chalk = require('chalk');
const docUtils = require('./doc-utils');
const docWriter = require('./doc-writer');

/**
 * A Monitor implementation
 */
class Monitor {

    /**
     * Creates a Monitor
     * @constructor
     * @param {Array.<string>} files - Array of file paths
     * @param {Object} [options]
     */
    constructor(files, options = {}) {
        this.files = files;
        this.options = options;
    }

    /**
     * Start monitoring and attach event listeners to it
     */
    watchPatient() {
        this.monitor = new Gaze(this.files);
    
        this.monitor.on('ready', () => {
            console.log('JSDoctor is now monitoring your code');
        });
        this.monitor.on('changed', this.doctorReport.bind(this));
        this.monitor.on('added', this.doctorReport.bind(this));
        this.monitor.on('error', error => {
            console.log(`JSDoctor watcher error: ${chalk.bold.reset(error)}.`);
        });
    }
    
    /**
     * Stop the monitoring
     */
    killPatient() {
        this.monitor.close();
    }
    
    /**
     * Logs to the console reports of doctoring work
     * @param {string} filepath
     * @private
     */
    doctorReport(filepath) {
        docWriter.doctorFile(filepath, this.options).then(() => {
            const path = chalk.yellow(filepath);
            const status = chalk.green("success");

            console.log(`Finished doctoring: ${path}. Status: ${status}.`);
        }).catch(error => {
            const path = chalk.yellow(filepath);
            error = chalk.red(error);

            console.log(`An error ocurred while trying to doctor the following file: ${path}. Details: ${error}`);
        });
    }
}

module.exports = function(path, options) {
    return docUtils.validateFiles(path).then(files => {
        const monitor = new Monitor(files, options);
        monitor.watchPatient();
        return monitor;
    });
};