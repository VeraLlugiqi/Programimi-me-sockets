const PORT = 3000;

server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});
