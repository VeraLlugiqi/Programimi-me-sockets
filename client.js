const net = require('net');
const readline = require('readline');

// Replace 'SERVER_IP' with the actual IP address of your server
const serverIp = '10.103.107.201';

const client = new net.Socket();
var port = 58901;
client.connect(port, serverIp, () => {
  console.log('U lidhet me server');
  console.log("Shkruani login per te pasur casje per read, write or execute");
});

client.on('data', (data) => {
  console.log(data.toString('utf-8'));
});

const rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', (line) => {
  client.write(`${line}\n`);
});

rl.on('close', () => {
  client.end();
});
