const rl = readline.createInterface({ 

  input: process.stdin 

  }); 

  rl.on('line', (line) => { 

  client.write(${line}\n); 

  }); 

  rl.on('close', () => { 

  client.end(); 

});
