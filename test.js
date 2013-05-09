
  try {
      var bt = new (require('bluetooth-serial-port')).BluetoothSerialPort();

      bt.on('found', function(address, name) {
        console.log('found', address);
      });

      bt.on('finished', function() {
        bt.inquire();
      });

      bt.inquire();
  } catch (e) {
    console.log("Normal (non LE) BlueTooth isn't working.");
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
     });
  } catch(e) {
    console.warn("BlueTooth LE isn't working");
  }
