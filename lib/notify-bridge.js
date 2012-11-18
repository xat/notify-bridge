/*
 * notify-bridge
 * https://github.com/xat/notify-bridge
 *
 * Copyright (c) 2012 Simon Kusterer
 * Licensed under the MIT license.
 */

var EventEmitter = require('events').EventEmitter,
    program = require('commander'),
    eventBus = new EventEmitter();

var list = function (val) {
  'use strict';
  return val.split(',');
};

var loadModule = function(moduleName) {
  'use strict';
  require(moduleName).init(eventBus);
};

var validateModule = function(moduleName) {
  'use strict';
  try {
    if (!require(moduleName)['notify-bridge-module']) {
      console.error();
      console.error(' error: module %s does not exist', moduleName);
      console.error();
      process.exit(1);
    }
  } catch (e) {
    console.error();
    console.error(' error: module %s does not exist', moduleName);
    console.error();
    process.exit(1);
  }
};

var NotifyBridge = function() {
  'use strict';
  program
    .version('0.0.1')
    .usage('[options] --start OR --module-help <module>')
    .option('-m, --module-help <string>', 'Show help for a certain Module')
    .option('-s, --start', 'Start the bridge')
    .option('-i, --input-modules <list>', 'The input Modules (default: notify-bridge-http)', list, ['notify-bridge-http'])
    .option('-o, --output-modules <list>', 'The output Modules (default: notify-bridge-socketio)', list, ['notify-bridge-socketio'])
    .parse(process.argv);

  if (program.moduleHelp) {
    validateModule(program.moduleHelp);
  }

  if (program.start) {
    // validate the modules
    program.inputModules.forEach(validateModule);
    program.outputModules.forEach(validateModule);

    // load the modules
    program.inputModules.forEach(loadModule);
    program.inputModules.forEach(loadModule);
  } else {
    program.help();
  }

};

exports.init = function() {
  return new NotifyBridge();
};
