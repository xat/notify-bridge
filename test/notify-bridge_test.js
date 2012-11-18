var notify_bridge = require('../lib/notify-bridge.js');

exports['client'] = {

  setUp: function(done) {
    this.nb = notify_bridge.init();
    done();
  },

  'initialize': function(test) {
    test.equal(typeof this.nb, 'object');
    test.done();
  }

};
