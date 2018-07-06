# TVONE library

This repository allow to use remote controll of the [tvone scaler](http://www.tvone.com/video-scaler-plus). 
Now it's in beta and the functionality are very few.

## List functionality

You can download the [protocoll](http://www.tvone.com/filestore/Manuals-CORIO-Products/tvONE%20C2-2x55%20Remote%20Control%20Specification%20V1.2.pdf). 
Currently yuo can use only the following functionality:

* Preset number (225)
* Preset load (226)

## Usage

```javascript
// Require library
const tvone = require('tvone');

// Create tcp adapter with default value
let tcpAdapter = new tvone.TcpAdapter(
    '192.168.1.200',
    10001 
);

// Create serial adapter with default value
let serialAdapter = new tvone.SerialAdapter(
    '/dev/ttyUSB0'
);

// Create the client with tcp adapter or serial adapter
let client = new Client(tcpAdapter);

/**
*  Send preset 2
*/
client.sendMessage(new tvone.Message('SET_PRESET', '000002'));
/**
*  load preset 2 previously loaded
*/
client.sendMessage(new tvone.Message('LOAD_PRESET', '000001'));

```