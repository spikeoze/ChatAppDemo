const socket = io();

const form = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');



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

    p.innerHTML = `<p>${message}</p>`;

    chatMessages.appendChild(p);
}

