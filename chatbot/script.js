let isMenuShown = false;
let dispatchMenu = INITIAL_MENU.INITIAL_MENU;
let timeoutID;
let userName;
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
let currentMenu = {
    id: "",
    menu: {

    },
};


// Mostrar mensaje inicial al cargar la página
showInitialMessage()
userInput.addEventListener('keydown', function(e) {handleMenuSelection(e, this)} );


const handleMenuSelection = (e, selfInput) => {
    if (e.key !== 'Enter') return

    const userInputValue = selfInput.value

    switch (dispatchMenu) {
        case INITIAL_MENU.INITIAL_MENU: 
            initialMenu({chatBox, userInputValue})
            showMenu({chatBox, userInputValue})
            selfInput.value = ""                                        // Limpia el input text 
            break;
        case INITIAL_MENU.FIRST_MENU:
            selectOptions({
                chatBox, userInputValue})


            currentMenu = {
                id: currentMenu.id + userInputValue,
                menu: menus[userInputValue]
            }
            console.log(currentMenu.menu)
            break;
        case INITIAL_MENU.FIRST_SUB_MENU:
            currentMenu = setCurrentMenu({currentMenu, userInputValue})
            console.log(currentMenu)
            break;
        default:
          console.log(`Sorry, we are out of ${expr}.`);
    }
}

const setCurrentMenu = ({currentMenu, userInputValue}) => {
    return {
        id: currentMenu.id + "." + userInputValue,
        menu: currentMenu.menu["options"][userInputValue]
    }
}

/* 
const menu = { 
    1: funciondsada(this.self),
    1.1 : sdaadsada
    1.1.2: sadsada
    primerMenu: "1",
    segundoMenu: "2",
}


menu(value)

value debe ser 1.1 o 1 

valu[-1]
*/

function showInitialMessage() { // Initial Message
    const chatBox = document.getElementById('chatBox');
    const initialMessage = document.createElement('div');

    initialMessage.className = 'bot-message';
    initialMessage.innerHTML = `
        <strong><br>Gremtur:</strong> <br> ¡Hola! Soy tu asistente virtual ¿Cómo puedo llamarte?
    `;
    chatBox.appendChild(initialMessage);
}

// Llamar a la función showBotMessage en las partes relevantes del código donde se muestra un mensaje del bot
function initialMenu({userInputValue}) { // Write User Name

    const userDiv = document.createElement('div');
    userName = userInputValue; // Asigno el nombre a la varible global
    
    userDiv.className = 'user-message';
    userDiv.innerHTML = `<br><strong>Tú:</strong> ${userInputValue}`;
    chatBox.appendChild(userDiv);

    dispatchMenu = INITIAL_MENU.FIRST_MENU
}

function showMenu({chatBox, userInputValue}) {          // Show the first menu 

    const botMessage = document.createElement('div');
    botMessage.className = 'bot-message';

    if (!isMenuShown) {
        botMessage.innerHTML = `
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
    } else {
        handleMenuSelection(userInputValue);
    }

    chatBox.appendChild(botMessage);    
}

function selectOptions({chatBox, userInputValue}) {
    if(!userInputValue) return 

    let menuOptions = ""    

    const valueSelected = menus[userInputValue]
    const optionsValueSelected = valueSelected["options"]
    const data = `
        <div class="bot-message">
        <strong><br>Gremtur:</strong> <br>Por favor elige una de las siguientes opciones:
        <br><br>
    `
    for (let options in optionsValueSelected) {
        menuOptions += ` ${options}. ${optionsValueSelected[options]["destiny"]}<br>`
    }

    chatBox.innerHTML += data.concat(" ", menuOptions, "</div>")

    dispatchMenu = INITIAL_MENU.FIRST_SUB_MENU
}

function initialMenu2() { // primer menu
    let userName = ""
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
        
        showMenu(chatBox, userName);

        isMenuShown = true; 
        userInput.value = '';
        return;
    }
    else if (userMessage === '1') {
        showSubMenuOne(chatBox, userMessage);
    } else if (userMessage === '1.1' || userMessage === '1.2' || userMessage === '1.3' /* Agrega más opciones 1.x si es necesario */) {
        handleSubMenuOneInput(chatBox, userMessage);
    }   
    else if (userMessage === '1') {
        showSubMenuOne(chatBox, userMessage);
    } else if (userMessage === '2') {
        showSubMenuTwo(chatBox, userMessage);
    } else if (userMessage === '3') {
        showSubMenuThree(chatBox, userMessage);
    } else if (userMessage === '4') {
        showSubMenuFour(chatBox, userMessage);
    } else if (userMessage === '5') {
        showSubMenuFive(chatBox, userMessage);
    } /*else {
        chatBox.innerHTML += `
            <div class="bot-message">
                <strong><br>Gremtur:</strong> <br>Opción no válida. Por favor elige una opción del 1 al 23  .
            </div>
        `;
    }*/
    userInput.value = '';

    userDiv.innerHTML = `<br><strong>Tú:</strong> ${userMessage}`;
    chatBox.appendChild(userDiv);

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
            </div>
        `;
    }
    return userName
}




/*
function returnToMainMenu(chatBox) {
    isMenuShown = true;
    showMenu(chatBox, dispatchMenu);
}

//creacion de submenu 
function showSubMenuOne(chatBox, userMessage){
    chatBox.innerHTML += `
        <div class="bot-message">
            <strong><br>Gremtur:</strong> <br>Por favor elige una de las siguientes opciones:
            <br><br>
            1 Amazonas<br>
            2 Armenia<br>
            3 Bahía Solano<br>
            4 Cartagena<br>
            5 Medellin<br>
            6 San Andrés<br>
            7 Santa Marta<br>
            8 Villa de Leyva<br>
            9 Europa<br>
            10 Cancún<br>
            11 Punta Cana<br>
            12 Ciudad de Mexico <br>
            13 Perú<br>
            14 Habana y Varadero<br>
            15 Cuba<br>
            16 Curacao<br>
            17 Brasil<br>
            18 Argentina<br>
            19 Panamá<br>
            20 Aruba<br>
            21 Estados Unidos <br>
            22 Crucero<br>      
            23 Volver al menú principal<br>
        </div>
    `;
    
    if (userMessage === '1.1') {
        // Mostrar destinos en promoción
        chatBox.innerHTML += `
            <div class="bot-message">
                <strong><br>Gremtur:</strong> <br> Los siguientes destinos están en promoción:
                <br>
                - Destino 1 en promoción<br>
                - Destino 2 en promoción<br>
                - Destino 3 en promoción<br>
                <!-- Agrega más destinos en promoción aquí -->
            </div>
        `;
    } else if (userMessage === '1.2') {
        // Mostrar fechas de viaje disponibles
        chatBox.innerHTML += `
            <div class="bot-message">
                <strong><br>Gremtur:</strong> <br> Las siguientes fechas de viaje están disponibles:
                <br>
                - Fecha 1 disponible<br>
                - Fecha 2 disponible<br>
                - Fecha 3 disponible<br>
                <!-- Agrega más fechas de viaje disponibles aquí -->
            </div>
        `;
    } else if (userMessage === '1.3') {
        // Solicitar número de adultos
        chatBox.innerHTML += `
            <div class="bot-message">
                <strong><br>Gremtur:</strong> <br> Por favor ingresa el número de adultos para la reserva.
            </div>
        `;
    }
    // Agrega más lógica para las otras opciones 1.4, 1.5, 1.6, 1.7, etc.

    userInput.value = ''; // Limpia la barra de entrada después de mostrar las opciones
    isMenuShown = true;
}

function showSubMenuTwo(chatBox, userMessage) { 
    chatBox.innerHTML += `
        <div class="bot-message">
            <strong><br>Gremtur:</strong> <br>Por favor elige una de las siguientes opciones:
            <br>
            1 Reservar vuelo<br>
            2 Reservar alojamiento<br>
            3 Volver al menú principal<br>
        </div>
        
    `;
    if (userMessage === '3') {
        isMenuShown = false;
        returnToMainMenu(chatBox);
        return;
    } else if (parseInt(userMessage) < 1 || parseInt(userMessage) > 3 || isNaN(parseInt(userMessage))) {
        chatBox.innerHTML += `
            <div class="bot-message">
                <strong><br>Gremtur:</strong> <br>Opción no válida. Por favor elige una opción del 1 al 3.
            </div>
        `;
        return;
    }
    userInput.value = ''; // Limpia la barra de entrada después de mostrar las opciones
    isMenuShown = true;
}

function showSubMenuThree(chatBox, userMessage) {
    chatBox.innerHTML += `
        <div class="bot-message">
            <strong><br>Gremtur:</strong> <br>Por favor elige una de las siguientes opciones:
            <br>
            1 Destinos Nacionales<br>
            2 Destinos Internacionales<br>
            3 Volver al menú principal<br>
        </div>
    `;
    if (userMessage === '3' && isMenuShown === false) {
        returnToMainMenu(chatBox);
        return;
    }
    userInput.value = ''; 
    isMenuShown = true;
}


*/



function resetTimer() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(()    => {
        endChatSession();
    }, 30000); // 30 segundos en milisegundos
}
function endChatSession() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML += `
        <div class="bot-message">
            <strong><br>Gremtur:</strong> <br> La sesión ha expirado debido a la inactividad. Si tienes más preguntas, por favor vuelve a iniciar una nueva sesión. ¡Que tengas un gran día!
        </div>
    `;
    isMenuShown = false;
    clearTimeout(timeoutID);
}

// Restablecer el temporizador en cada interacción del usuario
userInput.addEventListener('input', function() {
    resetTimer();
});

// Restablecer el temporizador cuando se muestra un mensaje del bot
function showBotMessage() {
    resetTimer();
    // ... (código para mostrar mensajes del bot)
}