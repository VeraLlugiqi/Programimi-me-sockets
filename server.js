const net = require('net');
const fs = require('fs');
const { exec } = require("child_process");
const PORT = 3000;

//server creation and message from which address and port is connection made
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
