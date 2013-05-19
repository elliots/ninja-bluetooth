ninja-bluetooth
=========

This driver for The NinjaBlocks Client that emits bluetooth addresses. Useful for state events when a persons phone in nearby.

The BLE functionality depends on https://github.com/sandeepmistry/noble which supports Linux and OSX
The Bluetooth functionality depends on https://github.com/eelcocramer/node-bluetooth-serial-port which only supports Linux.

It exposes device addresses as HID events, so you can (for instance) get an event when you (or at least, your phone) gets home.

VERY UNTESTED. NOT EVEN BETA.

### Installation

## License

Copyright (C) 2012 Ninja Blocks Inc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
