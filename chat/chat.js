const ws = new WebSocket('wss://seu-servidor-websocket'); // Altere para o seu servidor WS real

const userList = document.getElementById('user-list');
const chatMessages = document.getElementById('chat-messages');
const chatTitle = document.getElementById('chat-title');
const chatInput = document.getElementById('chat-input');

let selectedUser = 'Chat Geral';
let usersOnline = [{ name: 'Chat Geral', img: 'https://cdn-icons-png.flaticon.com/512/4083/4083225.png' }];

// Adiciona um usuário na lista
function addUser(name, img) {
    if (!usersOnline.some(user => user.name === name)) {
        usersOnline.push({ name, img });
        updateUserList();
    }
}

// Remove um usuário da lista
function removeUser(name) {
    usersOnline = usersOnline.filter(user => user.name !== name);
    updateUserList();
}

// Atualiza a lista de usuários no menu lateral
function updateUserList() {
    userList.innerHTML = '';
    usersOnline.forEach(user => {
        const li = document.createElement('li');
        li.onclick = () => selectUser(user.name);
        li.innerHTML = `<img src="${user.img}" alt="${user.name}">${user.name}`;
        userList.appendChild(li);
    });
}

// Seleciona um usuário para conversar
function selectUser(name) {
    selectedUser = name;
    chatTitle.innerText = name;
    chatMessages.innerHTML = ''; // Limpa mensagens ao trocar de chat
}

// Exibe uma mensagem no chat
function displayMessage(from, message, isSelf = false) {
    const msgDiv = document.createElement('div');
    msgDiv.style.textAlign = isSelf ? 'right' : 'left';
    msgDiv.innerHTML = `<strong>${from}:</strong> ${message}`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Rola para a última mensagem
}

// Envia mensagem pelo WebSocket
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && chatInput.value.trim() !== '') {
        const message = { to: selectedUser, text: chatInput.value };
        ws.send(JSON.stringify(message));
        displayMessage('Você', chatInput.value, true);
        chatInput.value = '';
    }
});

// Recebe mensagens do servidor
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'user_list') {
        usersOnline = [{ name: 'Chat Geral', img: 'https://cdn-icons-png.flaticon.com/512/4083/4083225.png' }, ...data.users];
        updateUserList();
    } else if (data.type === 'message' && data.to === selectedUser) {
        displayMessage(data.from, data.text);
    }
};

// Inicializa a lista de usuários
updateUserList();
