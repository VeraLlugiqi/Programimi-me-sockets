
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
