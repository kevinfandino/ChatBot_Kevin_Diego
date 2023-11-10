
let currentMenu = menu.menuInicial
let isMenuShown = false;
let userName = '';
let timeoutID;
const userInput = document.getElementById('userInput');




// Mostrar mensaje inicial al cargar la página
showInitialMessage();


function showInitialMessage() { // Menu inicial
    const chatBox = document.getElementById('chatBox');
    const initialMessage = document.createElement('div');
    initialMessage.className = 'bot-message';
    initialMessage.innerHTML = `
        <strong><br>Gremtur:</strong> <br> ¡Hola! Soy tu asistente virtual ¿Cómo puedo llamarte?
    `;
    chatBox.appendChild(initialMessage);
}

