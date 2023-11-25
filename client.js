const net = require('net'); 

const readline = require('readline'); 

//krijimi i nje client socket te ri dhe konektimi me serverin duke perdorur portin e njejte me serverin
const client = new net.Socket(); 

client.connect(58901, process.argv[2], () => { 

console.log('Connected to server'); 

console.log("If u want to get your access to write read or execute please type 'login' "); 

});

client.on('data', (data) => { 

console.log(data.toString('utf-8')); 

}); 

const rl = readline.createInterface({ 

  input: process.stdin 

  }); 

  rl.on('line', (line) => { 

  client.write(${line}\n); 

  }); 

  rl.on('close', () => { 

  client.end(); 

});
