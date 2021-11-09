const socket = io();


const form = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('userList')

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


// console.log(username, room);

// join room

socket.emit('joinRoom', ({username, room}));


// get room and users
socket.on('roomUsers', ({room, users})=>{
    showRoom(room);
    showUsers(users);
});

socket.on('message', (message)=>{
    console.log(message);
    showMessage(message);

    // Scroll
    chatMessages.scrollTop = chatMessages.scrollHeight
});



form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const message = e.target.elements.text.value

    socket.emit('chatMessage', message);

    e.target.elements.text.value = '';
})



function showMessage(message){
    const div = document.createElement('div');

    div.innerHTML = `
    <p class="username">${message.username}<span> ${message.time}</span> </p>
    <p>${message.text}</p>
    `;
    div.classList.add('message-card');
    chatMessages.appendChild(div);
}


function showRoom(room){
    
    roomName.innerText = room;
}


function showUsers(users){
  
    userList.innerHTML = `
        ${users.map(user => `<p>${user.username}</p>`).join('')}
    `
}
