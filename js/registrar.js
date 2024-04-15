// Obtener elementos del DOM
const formularioInicioSesion = document.getElementById('Formulario');
const NombreLoginInput = formularioInicioSesion.querySelector('#NombreLogin');
let usuariosRegistrados = []; // Lista para almacenar usuarios registrados

function registrarUsuario() {   
    const nombreInput = document.getElementById('nombre');
    const nombre = nombreInput.value.trim();

    if (!nombre) {
        alert('Por favor, ingrese su nombre de usuario');
        return;
    }

    if (usuariosRegistrados.includes(nombre)) {
        alert('El nombre de usuario ya existe. Por favor, ingrese otro nombre');
        return;
    }

    usuariosRegistrados.push(nombre);

    const usuariosRegistradosJSON = JSON.stringify(usuariosRegistrados);
    localStorage.setItem('usuariosRegistrados', usuariosRegistradosJSON);

    alert('Usuario registrado correctamente');
}

function iniciarSesion() {   
    const nombreLogin = NombreLoginInput.value.trim();

    if (!nombreLogin) {
        alert('Por favor, ingrese su nombre completo');
        return;
    }

    const usuariosRegistradosAlmacenados = localStorage.getItem('usuariosRegistrados');

    if (usuariosRegistradosAlmacenados) {       
        usuariosRegistrados = JSON.parse(usuariosRegistradosAlmacenados);

        if (usuariosRegistrados.includes(nombreLogin)) {
            alert('¡Bienvenido/a ' + nombreLogin + ' ha iniciado sesión correctamente!');
            // Redirigir al usuario a MenudeJuegos.html
            window.location.href = "MenudeJuegos.html";
        } else {
            alert('Usuario no encontrado. Por favor, regístrese primero');
        }
    } else {     
        alert('No hay usuarios registrados. Por favor, regístrese primero');
    }
}

const usuariosRegistradosJSON = localStorage.getItem('usuariosRegistrados');
if (usuariosRegistradosJSON) {
    usuariosRegistrados = JSON.parse(usuariosRegistradosJSON);
}

NombreLoginInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        iniciarSesion();
        // Refrescar la página si el usuario no está registrado
        if (!usuariosRegistrados.includes(NombreLoginInput.value.trim())) {
            window.location.reload();
        }
    }
});
