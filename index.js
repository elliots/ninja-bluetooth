var util = require('util'),
  stream = require('stream');

util.inherits(Driver,stream);
util.inherits(Device,stream);

function Driver(opts,app) {
  var self = this;
  app.on('client::up',function(){
    self.emit('register', new Device(app));
  });
  this.app = app;
}

function Device(app) {
  this.writeable = false;
  this.readable = true;
  this.V = 0;
  this.D = 14;
  this.G = 0;
  this.app = app;
  var self = this;

  try {
      var bt = new (require('bluetooth-serial-port')).BluetoothSerialPort();

      bt.on('found', function(address, name) {
        self.emit('data', address);
        self.app.log.info("Found bluetooth device", name, address);
      });


      function scan() {
        bt.inquire();
        self.app.log.debug("Scanning for bluetooth devices");
      }
      bt.on('finished', scan);

      scan();
  } catch (e) {
    self.app.log.warn("Bluetooth is not available.");
  }

  try {
    var noble = require('noble');

    noble.on('stateChange', function(state) {
      console.log('noble -> stateChange: ' + state);

      if (state === 'poweredOn') {
        noble.startScanning();
      } else {
        noble.stopScanning();
      }
    });

    noble.on('scanStart', function() {
      console.log('noble -> scanStart');
    });

    noble.on('scanStop', function() {
      console.log('noble -> scanStop');
    });
    noble.on('discover', function(peripheral) {
        self.app.log.info('noble -> discover: ', peripheral);
        self.emit('data', peripheral.uuid);
     });
  } catch(e) {
    self.app.log.warn("Bluetooth LE is not available.");
  }

}

module.exports = Driver;
