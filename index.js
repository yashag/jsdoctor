'use strict';

const docWriter = require('./lib/doc-writer');
const docWatcher = require('./lib/doc-watcher');

module.exports = function(path, options = {}) {
    if(options.watch) {
        return docWatcher(path, options);
    } else {
        return docWriter.doctor(path, options);
    }
};
