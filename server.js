const net = require('net');
const fs = require('fs');
const { exec } = require("child_process");
const PORT = 6452;

//krijimi i serverit dhe mesazhit nga e cila adresa dhe porti eshte konektuar
const server = net.createServer((socket) => {
    console.log(
        'Connection from',
        socket.remoteAddress,
        'port',
        socket.remotePort
    );
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});
