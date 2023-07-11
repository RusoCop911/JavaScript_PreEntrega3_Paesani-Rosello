function convertirAMayusculas() {
    let inputNombre = document.getElementById("nombre");
    inputNombre.value = inputNombre.value.toUpperCase();
}

document.getElementById('boton').addEventListener('click', function () {
    const nombreInput = document.getElementById('nombre');
    const cuitInput = document.getElementById('cuit');

    const nombre = nombreInput.value.trim();
    const cuit = cuitInput.value.trim();

    if (!nombre || !cuit || !/^[A-Za-z\s]+$/.test(nombre) || isNaN(Number(cuit))) {
        alert("Ingrese un nombre y apellido válido (solo letras y espacios) y un número de DNI válido (solo números).");
        return;
    }

    localStorage.setItem('nombre', nombre);
    localStorage.setItem('cuit', cuit);

    mostrarAlerta();
});

function mostrarAlerta() {
    let alerta = document.getElementById("alerta");
    alerta.style.display = "block";

    let contador = document.getElementById("contador");
    let segundos = 3;
    contador.innerHTML = "Redirigiendo a la app en " + segundos + " segundos.";

    let intervalo = setInterval(function () {
        segundos--;
        contador.innerHTML = "Redirigiendo a la app en " + segundos + " segundos.";

        if (segundos <= 0) {
            clearInterval(intervalo);
            window.location.href = 'aplicacion.html';
        }
    }, 1000);
}