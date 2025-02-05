let nroSecreto = 0; 
let intentos = 0;
let intentosMax = 4;
let listaNros = []; 
let nromaximo = 100;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let nroUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (nroUsuario === nroSecreto) {
        asignarTextoElemento('p', `Acertaste el número!! En ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuarrio no acerto, entonces tenemos dos caminos:
        if (nroUsuario > nroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    if (intentos > intentosMax) {
        alert(`Llegaste al máximo de ${intentosMax} intentos posibles. El nro Secreto era: ${nroSecreto}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    return;  
} 

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function generarNroSecreto() {
    let nroGenerado = Math.floor(Math.random()*nromaximo)+1;
    
    console.log(nroGenerado);
    console.log(listaNros);
    //Si ya sorteamos todos los nros
    if (listaNros.length == nromaximo) {
       asignarTextoElemento('p', 'Ya se usaron todos los números posibles.'); 
    } else {
         //Si el nroGenerado esta incluido en la lista
        if (listaNros.includes(nroGenerado)) {
            return generarNroSecreto();
        } else {
            listaNros.push(nroGenerado);
            return nroGenerado;
        }
    }
}   

function condicionInicio() {
    asignarTextoElemento('h1', 'Juego del Número Secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${nromaximo}`);
    nroSecreto = generarNroSecreto();
    intentos = 1;
    console.log(nroSecreto);
}

function reiniciarJuego() {
    //limpiar la caja
    limpiarCaja();
    /* Indicar mensaje con el intervalo de números
    Generar un nuevo número aleatorio
    Inicializar el número de intentos */
    condicionInicio();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

//------------------------------------------------------------
condicionInicio();
