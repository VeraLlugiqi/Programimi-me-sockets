
const net = require('net');
const fs = require('fs');
const { exec } = require("child_process");

// server creation and message from which address and port is connection made
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
        // showing input of the client at the server side as a string
        console.log(buffer.toString().slice(''));
        // converting input to string without spaces and initializing that on a variable called message
        let message = buffer.toString().trim();
        // showing at the server side the length of data inputted
        console.log("Gjatesia e kerkeses eshte: " + message.length);

        // making conditionals as a simulation of the login form of the client-side
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
            });
                   fs.chmod("example.txt", 0o600, () => {
                socket.write("\nLeximi i permbajtjes se file para ndryshimeve/writes: \n");
                socket.write(fs.readFileSync('example.txt', 'utf-8') + "\n");

                socket.write("\nDuke provuar shkrimin ne file: \n");
                socket.write("Duke u ngarkaur...\n");

                // letting the client overwrite on a given file
                fs.writeFileSync('example.txt', "Keni ndryshuar 'example.txt' file sepse keni kete privilegj!");

                socket.write("\nLeximi i file pas ndryshimit/writes\n");
                socket.write(fs.readFileSync('example.txt', 'utf-8') + "\n");

                // letting the client read files of that directory and show them on the server side
                fileObjs = fs.readdirSync(__dirname, { withFileTypes: true });

                console.log("\nFile ne direktoriumin aktual:");
                fileObjs.forEach(file => {
                    console.log(file);
                });
                socket.write("Shkruani 'execute' per te ekzekutuar file pasi qe keni kete privilegj!");

            });
        }
    
        else if (message == "tringa tringaBaftiu" || message == "suheja suhejlaHoxha" || message == "valtrina valtrinaCacaj") {
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
                        });
                    }
                          
                    else if (message == "Hello" || message == "hello") {
                        socket.write("Hello client!");
                    }
                    else if (message == "execute") {
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
                        })
                    }



