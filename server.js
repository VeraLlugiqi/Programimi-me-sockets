const net = require('net');
const fs = require('fs'); 
const { exec } = require("child_process"); 

// Krijimi i serverit dhe mesazhi nga i cili bëhet lidhja e adresës dhe portit
const server = net.createServer((socket) => { 
    console.log(  
        'Connection from',
        socket.remoteAddress,
        'port',
        socket.remotePort
    );
    // beginning of getting data from the client
    socket.on('data', (buffer) => { 
        console.log( 
            'Request from',
            socket.remoteAddress,
            'port',
            socket.remotePort
        );
        
        // duke treguar input-in e klientit në anën e serverit si një string
        console.log(buffer.toString());
        // konvertimi i input-it në string pa hapësira dhe inicializimi i tij në një variabël të quajtur mesazh
        let message = buffer.toString().trim();
        

        // krijimi i kushteve si një simulim i formës së login-it në anën e klientit
        if (message == "login" || message == "Login") {
            socket.write("Shkruani: Username Password");
        }
        else if (message == "vera veraLlugiqi") {
            console.log("Ky perdorues ka privilegjet: read, write, execute");
            // giving permission to read at a given file
            socket.write("\nDuke shfaqur skedarët aktual të direktorise...");

            fs.readdir(__dirname, (err, files) => {
                if (err)
                    socket.write(err);
                else {
                    socket.write("\nEmrat e file-ve ne kete direktorium:");
                    files.forEach(file => {
                        socket.write(file + "\n");
                    });
                }
                socket.write("\nChoose an action: write, execute, or read");
            });

            
            socket.on('data', (action) => {
            action = action.toString().trim().toLowerCase();
                if (action === "write") {
                    socket.write("Sheno emrin e fajllit qe do te shenoni(.txt file): ");

                    socket.once('data', (fileName) => {
                        fileName = fileName.toString().trim();
                        socket.write(`Enter content to write to ${fileName}: `);

                        // Trajto përmbajtjen që do të shkruhet në example.txt
                        socket.once('data', (content) => {
                            content = content.toString().trim();
                            // Shkruani përmbajtjen e marrë në skedarin e specifikuar
                            fs.appendFile(fileName, content, (err) => {
                                if (err) {
                                    socket.write(`Error occurred while writing to ${fileName}.`);
                                } else {
                                    socket.write(`Content written successfully to ${fileName}`);
                                }
                            });
                        });
                    });
                } else if (action === "execute") {
                    socket.write("\nCilin file doni te ekzekutoni?");
                            fs.readdir(__dirname, (err, files) => {
                                if (err)
                                    socket.write(err);
                                else {
                                    socket.write("\nEmrat e file-ve ne kete direktorium:");
                                    files.forEach(file => {
                                        socket.write(file + "\n");
                                    })
                                }
                                socket.write("Sheno emrin e fajllit qe do te shenoni(.txt file): ")
                            })
                } else if (action === "read") {
                    socket.write("\Duke lexuar permbajtjen e file 'readonly.txt' \n");
                    socket.write(fs.readFileSync('readonly.txt', 'utf-8') + "\n");
                } 
        });
        }
        else if (message == "tringa tringaBaftiu" || message == "suhejla suhejlaHoxha" || message == "valtrina valtrinaCacaj") {
                        console.log("Ky perdorues ka read privilegje");
                        socket.write("\nShowing files in current directory...");
                        fs.readdir(__dirname, (err, files) => { 
                            if (err)
                                socket.write(err);
                            else {
                                socket.write("\nEmrat e file-ve ne kete direktorium:\n");
                                files.forEach(file => { 
                                    socket.write(file + "\n");
                                });
                            }
                            socket.write("Per te lexuar 'readonly.txt' shkruni 'read'");

                            socket.on('data', (action) => {
                                action = action.toString().trim().toLowerCase();
                                if (action === "read") {
                                    socket.write("\Duke lexuar permbajtjen e file 'readonly.txt' \n");
                                    socket.write(fs.readFileSync('readonly.txt', 'utf-8') + "\n"); //reads the content of the file "readonly.txt" using fs.readFileSync and sends the content back to the client using socket.write(). The file content is read as UTF-8 encoded text.
                       
                                } 
                            });
                        });
        }
                          
        else if (message == "Hello" || message == "hello") {
                        socket.write("Hello client!");
        }
        else if (message == "example.txt") {
                        exec("example.txt", (error, stdout, stderr) => {
                            if (error) {
                                console.log(`error: ${error.message}`);
                                return;
                            }
                            if (stderr) {
                                console.log(`stderr: ${stderr}`);
                                return;
                            }
                            console.log(`stdout: ${stdout}`);
                        });
                        socket.write("\Duke lexuar permbajtjen e file 'example.txt' \n");
                        socket.write(fs.readFileSync('example.txt', 'utf-8') + "\n");
        }
        else if (message == "readonly.txt") {
            exec("example.txt", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
            socket.write("\Duke lexuar permbajtjen e file 'readonly.txt' \n");
            socket.write(fs.readFileSync('readonly.txt', 'utf-8') + "\n");
}
        else {
            socket.write(message.toUpperCase());
        }

    });
    // telling that on close tab socket will expire/destroy
    socket.on('end', () => {
        console.log('Closed', socket.remoteAddress, 'port', socket.remotePort);
    });
});

server.maxConnections = 20;
var port = 58901;
server.listen(port, '0.0.0.0');
