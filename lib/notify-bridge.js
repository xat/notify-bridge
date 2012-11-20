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
  require(moduleName).init(eventBus, program);
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
    .usage('[options] --start')
    .option('-s, --start', 'Start the bridge')
    .option('-i, --input-modules <list>', 'The input Modules (default: notify-bridge-http)', list, ['notify-bridge-http'])
    .option('-o, --output-modules <list>', 'The output Modules (default: notify-bridge-socketio)', list, ['notify-bridge-socketio'])

	  .option('-hi, --http-ip <string>', 'Bind the HTTP Server to an IP (default: 127.0.0.1)', '127.0.0.1')
	  .option('-hp, --http-port <string>', 'On which port should the HTTP Server listen (default: 4440)', '4440')
	  .option('-ha, --http-auth <boolean>', 'Use Basic Authentication (default: false)', false)
	  .option('-hu, --http-user <string>', 'Basic Authentication Username (default: admin)', 'admin')
	  .option('-hr, --http-password <string>', 'Basic Authentication Password (default: admin)', 'admin')
	  .option('-sp, --socketio-port <string>', 'On which port should the Socket.IO Server listen (default: 4450)', '4450')

	  .parse(process.argv);

  if (program.start) {
    // validate the modules
    program.inputModules.forEach(validateModule);
    //program.outputModules.forEach(validateModule);

    // load the modules
    program.inputModules.forEach(loadModule);
    //program.outputModules.forEach(loadModule);
  } else {
    program.help();
  }

};

exports.init = function() {
  return new NotifyBridge();
};
