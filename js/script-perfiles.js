document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('perfilForm');
    const mensaje = document.getElementById('mensaje');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente
        
        // Obtener el valor del nombre del usuario ingresado en el formulario
        const nombre = document.getElementById('nombre').value;

        // Verificar si se ingresó un nombre
        if (nombre) {
            // Si se ingresó un nombre, mostrar un mensaje de bienvenida
            mensaje.textContent = `¡Bienvenido, ${nombre}! Estás listo para jugar.`;
        } else {
            // Si no se ingresó un nombre, mostrar un mensaje de error
            mensaje.textContent = 'Por favor, ingresa tu nombre de usuario.';
        }
    });
});
