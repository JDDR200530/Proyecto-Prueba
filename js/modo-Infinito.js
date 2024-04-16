// Variables
let numeros = [];
let cartasReveladas = 0;
let carta1;
let carta2;
let primerValor;
let segundoValor;
let contadorMovimientos = 0;
let contadorAciertos = 0;
let contadorErrores = 0;
let contadorTiempo = 0;
let temporizador = false;
let detenerTiempo;
let cantidadCartas = 4; // Cantidad inicial de cartas
const dificultades = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28]; // Array con la cantidad de cartas por nivel
let nivelActual = 0;

// Crear contenedor del juego
const contenedorJuego = document.createElement('div');
contenedorJuego.classList.add('juego');
const contenedor = document.querySelector('.contenedor');
contenedor.appendChild(contenedorJuego);

// Generar estadisticas
function generarEstadisticas(){
    // Titulo del juego
    const titulo = document.createElement('h1');
    titulo.innerHTML = 'Memorama';
    // Aciertos
    const aciertos = document.createElement('h3');
    aciertos.id = 'aciertos';
    aciertos.classList.add('estadisticas');
    aciertos.innerHTML = `Aciertos: ${contadorAciertos} de ${cantidadCartas / 2}`;
    // Errores
    const errores = document.createElement('h3');
    errores.id = 'errores';
    errores.classList.add('estadisticas');
    errores.innerHTML = 'Errores: 0';
    // Tiempo
    const tiempo = document.createElement('h3');
    tiempo.id = 'tiempo';
    tiempo.classList.add('estadisticas');
    tiempo.innerHTML = 'Tiempo: 0 segundos';
    // Movimientos
    const movimientos = document.createElement('h3');
    movimientos.id = 'movimientos';
    movimientos.classList.add('estadisticas');
    movimientos.innerHTML = 'Movimientos: 0';

    // Insertar las estadisticas en el contenedorJuego
    contenedorJuego.appendChild(titulo);
    contenedorJuego.appendChild(aciertos);
    contenedorJuego.appendChild(errores);
    contenedorJuego.appendChild(tiempo);
    contenedorJuego.appendChild(movimientos);

    return movimientos; // Retornamos el elemento movimientos
}

const movimientos = generarEstadisticas(); // Guardamos la referencia al elemento movimientos

function generarNumeros(cantidad) {
    numeros = [];
    const maxNumero = cantidad / 2;
    
    // Crear un array con los números de 1 a maxNumero
    const numerosBase = [];
    for (let i = 1; i <= maxNumero; i++) {
        numerosBase.push(i);
    }
    
    // Duplicar los números base y añadirlos al array numeros
    for (let i = 0; i < maxNumero; i++) {
        numeros.push(numerosBase[i]);
        numeros.push(numerosBase[i]);
    }

    // Desordenar los números
    numeros = numeros.sort(() => {
        return Math.random() - 0.5;
    });
}

// Desordenar y generar los números
generarNumeros(cantidadCartas);

// Generar tablero
const tablero = document.createElement('div');
tablero.classList.add('tablero');
contenedorJuego.appendChild(tablero);

// Generar los botones
function generarBotones(cantidadCartas) {
    tablero.innerHTML = ""; // Limpiar el tablero antes de generar nuevos botones
    for (let i = 0; i < cantidadCartas; i++) {
        const botones = document.createElement("button");
        botones.id = i;
        botones.setAttribute("onclick", `revelar(${botones.id})`);
        tablero.appendChild(botones);
    }
}

function revelar(id){
    // Iniciar a contar el tiempo
    if(temporizador === false){
        iniciarTiempo();
        temporizador = true;
    }

    cartasReveladas++;

    // Ver si ya se levantaron cartas
    if(cartasReveladas === 1){
        carta1 = document.getElementById(id);
        primerValor = numeros[id];
        carta1.innerHTML = primerValor;
        carta1.disabled = true;
        carta1.classList.add('mostrar');
    }else if(cartasReveladas === 2){
        carta2 = document.getElementById(id);
        segundoValor = numeros[id];
        carta2.innerHTML = segundoValor;
        carta2.disabled = true;
        carta2.classList.add('mostrar');

        // Aumentar movimientos
        contadorMovimientos++;
        movimientos.innerHTML = `Movimientos: ${contadorMovimientos}`;

        // Ver si ambas cartas son iguales o no
        if(primerValor === segundoValor){
            cartasReveladas = 0;
            contadorAciertos++;
            document.getElementById('aciertos').innerHTML = `Aciertos: ${contadorAciertos} de ${cantidadCartas / 2}`;
            // Verificar si se completaron todos los pares
            if (contadorAciertos === cantidadCartas / 2) {
                // Si se completaron, aumentar la cantidad de cartas
                aumentarCartas();
            }
        }else{
            setTimeout(() => {
                carta1.innerHTML = ' ';
                carta2.innerHTML = ' ';
                carta1.disabled = false;
                carta2.disabled = false;
                carta1.classList.remove('mostrar');
                carta2.classList.remove('mostrar');
                cartasReveladas = 0;
            }, 700);
            contadorErrores++;
            document.getElementById('errores').innerHTML = `Errores: ${contadorErrores}`;
        }
    }
}

function iniciarTiempo(){
    detenerTiempo = setInterval(()=>{
        contadorTiempo++;
        document.getElementById('tiempo').innerHTML = `Tiempo: ${contadorTiempo} segundos`;
        if(contadorAciertos === cantidadCartas / 2){
            clearInterval(detenerTiempo);
        }
    }, 1000);
}

// Función para incrementar la cantidad de cartas y la cantidad de aciertos esperados
function aumentarCartas() {
    nivelActual++; // Incrementar el nivel actual
    if (nivelActual < dificultades.length) { // Verificar que el nivel actual esté dentro del rango
        cantidadCartas = dificultades[nivelActual]; // Obtener la cantidad de cartas para el nuevo nivel
        generarNumeros(cantidadCartas); // Generar nuevos números
        generarBotones(cantidadCartas); // Generar nuevos botones
        contadorAciertos = 0; // Reiniciar la cantidad de aciertos
        // Actualizar la cantidad de aciertos esperados
        document.getElementById('aciertos').innerHTML = `Aciertos: ${contadorAciertos} de ${cantidadCartas / 2}`;
    }
}

// Función para generar botones con la cantidad inicial de cartas
generarBotones(cantidadCartas);
