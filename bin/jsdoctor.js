#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');
const jsdoctor = require('..');

const doctorOptions = {};

function doctorFiles(path, options) {
    const startTime = new Date();
    jsdoctor(path, options).then(result => {
        const finishTime = new Date();

        if (result.status === "success") {
            const duration = finishTime.getTime() - startTime.getTime() + chalk.cyan('ms');
            const status = chalk.green(result.status);
            console.log(`Finished doctoring files after: ${duration}. Status: ${status}.`);
        } else {
            const status = chalk.red(result.status);
            const error = chalk.red(result.error);
            console.log('An error ocurred while trying to doctor the requsted files. Status: ', status);
            console.log('Details: ', error);
        }
    });
}

function watchFiles(path, options) {
    Object.assign(options, {watch: true});
    jsdoctor(path, options);
}

program
    .version('1.0.0')
    .usage('<path> [options]')
    .description('Add automatically generated jsdoc documentation to your files')
    .option('-o, --override', 'override comments. Previously written comments will be overwritten')
    .option('-w, --watch', 'watch request files and immediately document them')
    .action((path, options) => {
        doctorOptions.overrideComments = options.override;

        options.watch ? watchFiles(path, doctorOptions) : doctorFiles(path, doctorOptions);
    });

program.on('--help', function () {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ jsdoctor "./lib/files/myfile.js"');
    console.log('    $ jsdoctor "./lib/files/**" -ow');
});

program.parse(process.argv);

if (!program.args.length) {
    program.outputHelp();
}