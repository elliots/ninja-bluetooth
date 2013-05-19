var util = require('util'),
  stream = require('stream'),
  BlueTooth = require('bluetooth-serial-port');

util.inherits(Driver,stream);
util.inherits(Device,stream);

function Driver(opts,app) {
  var self = this;
  app.on('client::up',function(){
    self.emit('register', new Device());
  });
}

function Device() {
  this.writeable = false;
  this.readable = true;
  this.V = 0;
  this.D = 14;
  this.G = 0;
  var self = this;

  try {
      var bt = new (require('bluetooth-serial-port')).BluetoothSerialPort();

      bt.on('found', function(address, name) {
        self.emit('data', address);
      });

      bt.on('finished', function() {
        bt.inquire();
      });

      bt.inquire();
  } catch (e) {
    console.log("BlueTooth isn't working.");
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
        console.log('noble -> discover: ' + peripheral);
        self.emit('data', peripheral.uuid);
     });
  } catch(e) {
    console.warn("BlueTooth LE isn't working");
  }

}

module.exports = Driver;
