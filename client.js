import {io} from 'socket.io-client';

let counter = 0;

const socket = io('https://gilded-semifreddo-ea1757.netlify.app/?', {
    auth:       {
        serverOffset: 0
    },
    ackTimeout: 10000,
    retries:    3,
    path:       '/'
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        const clientOffset = `${socket.id}-${counter++}`;
        socket.emit('chat message', input.value, clientOffset);
        input.value = '';
    }
});

socket.on('chat message', (msg, serverOffset) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    console.log(socket);
    socket.auth.serverOffset = serverOffset;
});