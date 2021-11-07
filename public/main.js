const socket = io();


const form = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');


const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


// console.log(username, room);

// join room

socket.emit('joinRoom', ({username, room}));


socket.on('message', (message)=>{
    console.log(message);
    showMessage(message);
});



form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const message = e.target.elements.text.value

    socket.emit('chatMessage', message);

    e.target.elements.text.value = '';
})



function showMessage(message){
    const p = document.createElement('p');

    p.innerHTML = `
    <p>${message.username}<span> ${message.time}</span> </p>
    <p>${message.text}</p>
    `;

    chatMessages.appendChild(p);
}

