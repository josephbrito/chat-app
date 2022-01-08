const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');


app.use('/', express.static(path.join(__dirname, 'public')));

const PORT = 3250;
const server = app.listen(PORT, ()=> console.log("Server running", PORT));

const messages = [];

const io = socket(server);
    io.on('connection', (socket)=>{
    console.log('New connection');
    socket.emit('update_messages', messages)
    socket.on('new_message', data =>{
        messages.push(data);

        io.emit('update_messages', messages);
    })
})

