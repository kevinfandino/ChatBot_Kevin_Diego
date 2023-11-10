let previus = "1"

userInput.addEventListener('keydown', function(event) {
    resetTimer();
    let funcion = () => {}

    if (event.key !== 'Enter')  return 

    currentMenu(previus+"."+event.key)
    previus =   ´${previus} . ${event.key}´


    
    if(currentMenu === menu.menuInicial) {
        sendMessage()
    } else if (currentMenu === menu.primerMenu) {
        funcion = firstMessage({...event})
    }  else if (currentMenu === menu.segundoMenu) {
        
    }         
});



const sendMessage = () => {
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');

    const userMessage = userInput.value;
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';

    if (userMessage === userName && !isMenuShown) {
        chatBox.innerHTML += `
            <div class="bot-message">
                <strong><br>Gremtur:</strong> <br> Hola, ${userName}! Selecciona una de las siguientes opciones.
                <br><br>
                1. Ver destinos disponibles <br>
                2. Hacer una reserva<br>
                3. Ver información sobre mi paquete de viajes<br>
                4. Obtener información sobre un destino<br>
                5. Ponerse en contacto con un agente de viajes<br>
                6. Salir
                <br>
            `;
        isMenuShown = true;
    }

    if (userMessage.toLowerCase() === '6') {
    chatBox.innerHTML += `
        <div class="bot-message">
            <strong><br>Gremtur:</strong> <br>Espero haberte ayudado. Si tienes alguna otra pregunta, no dudes en preguntar. ¡Que tengas un gran día!
        </div> `;
        return;
    }
    currentMenu = menu.primerMenu
}

const firstMessage = ({key}) => {
    const userInput = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');

    const userMessage = userInput.value;
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';

    userInput.value = ''; //para limpiar la barra cada que se envie un mensaje 

    if (!userName) {
        userName = userMessage;
        const userGreeting = document.createElement('div');
        userGreeting.className = 'user-message';
        userGreeting.innerHTML = `<br><strong>Tú:</strong> ${userName}`;
        chatBox.appendChild(userGreeting);
        showMenu(chatBox);
        isMenuShown = true; 
        userInput.value = '';
        return;
    } else if (userMessage === '1') {
        return showSubMenuOne(chatBox, userMessage);
    } else if (userMessage === '1.1' || userMessage === '1.2' || userMessage === '1.3' /* Agrega más opciones 1.x si es necesario */) {
        handleSubMenuOneInput(chatBox, userMessage);
    } else if (key === '1') {
        showSubMenuOne(chatBox, userMessage);
    } else if (key === '2') {
        showSubMenuTwo(chatBox, userMessage);
    } else if (key === '3') {
        showSubMenuThree(chatBox, userMessage);
    } else if (key === '4') {
        showSubMenuFour(chatBox, userMessage);
    } else if (key === '5') {
        showSubMenuFive(chatBox, userMessage);
    } /*else {
        chatBox.innerHTML += `
            <div class="bot-message">
                <strong><br>Gremtur:</strong> <br>Opción no válida. Por favor elige una opción del 1 al 23  .
            </div>
        `;
    }*/
    userInput.value = '';
}