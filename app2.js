const divisas = [
    { id: 1, nombre: "dólares", continente: "América", pais: "EEUU", valorBlue: 500 },
    { id: 2, nombre: "reales", continente: "América", pais: "Brasil", valorBlue: 91 },
    { id: 3, nombre: "bolívares venezolanos", continente: "América", pais: "Venezuela", valorBlue: 2 },
    { id: 4, nombre: "euros", continente: "Europa", pais: "Unión Europea", valorBlue: 540 },
    { id: 5, nombre: "libras esterlinas", continente: "Europa", pais: "Reino Unido", valorBlue: 600 },
    { id: 6, nombre: "francos suizos", continente: "Europa", pais: "Suiza", valorBlue: 530 },
    { id: 7, nombre: "rublos rusos", continente: "Europa", pais: "Rusia", valorBlue: 7 },
    { id: 8, nombre: "yenes japoneses", continente: "Asia", pais: "Japón", valorBlue: 4 },
    { id: 9, nombre: "yuanes chinos", continente: "Asia", pais: "China", valorBlue: 73 },
    { id: 10, nombre: "dólares australianos", continente: "Oceanía", pais: "Australia", valorBlue: 360 },
];

const carrito = document.getElementById('carrito');

function agregarElementoAlCarrito() {
}

agregarElementoAlCarrito();

const tarjetasCompraVenta = document.getElementById('tarjetas-compraVenta');
const continenteCards = document.getElementById('continente-cards');
const tarjetaCompra = document.querySelector('[data-compraVenta="Compra"]');
const tarjetaVender = document.querySelector('[data-compraVenta="Venta"]');
const historialDiv = document.getElementById('historial-divisas');

let venderAbierto = false;
let compraAbierto = false;
let cantidadPesos = '';
let historialConversiones = [];

const cantidadGuardada = localStorage.getItem('cantidadPesos');
if (cantidadGuardada) {
    cantidadPesos = cantidadGuardada;
}

const historialGuardado = localStorage.getItem('historialConversiones');
if (historialGuardado) {
    historialConversiones = JSON.parse(historialGuardado);
}

function guardarDatos() {
    localStorage.setItem('cantidadPesos', cantidadPesos);
    localStorage.setItem('historialConversiones', JSON.stringify(historialConversiones));
}

function mostrarHistorial() {
    historialDiv.innerHTML = '';
    historialConversiones.forEach(function (conversion) {
        const conversionDiv = document.createElement('div');
        conversionDiv.textContent = `${conversion.cantidadPesos} pesos argentinos = ${conversion.resultado}`;
        historialDiv.appendChild(conversionDiv);
    });
}

tarjetasCompraVenta.addEventListener('click', function (event) {
    const dataCompraVenta = event.target.getAttribute('data-compraVenta');
    if (dataCompraVenta === 'Compra') {
        if (!compraAbierto) {
            continenteCards.style.display = 'flex';
            compraAbierto = true;
        } else {
            continenteCards.style.display = 'none';
            compraAbierto = false;
        }

        if (venderAbierto) {
            const divVenta = document.querySelector('.tarjeta-venta');
            if (divVenta) {
                divVenta.remove();
            }
            venderAbierto = false;
        }
    } else if (dataCompraVenta === 'Venta') {
        if (!venderAbierto) {
            if (compraAbierto) {
                continenteCards.style.display = 'none';
                compraAbierto = false;
            }

            const divVenta = document.createElement('div');
            divVenta.classList.add('tarjeta-venta');
            tarjetaVender.parentNode.insertBefore(divVenta, tarjetaVender.nextSibling);

            const inputCantidadPesos = document.createElement('input');
            inputCantidadPesos.setAttribute('type', 'number');
            inputCantidadPesos.setAttribute('id', 'cantidad-pesos');
            inputCantidadPesos.setAttribute('placeholder', 'Ingrese la cantidad de pesos argentinos a vender');
            inputCantidadPesos.value = cantidadPesos;
            divVenta.appendChild(inputCantidadPesos);

            const btnConvertir = document.createElement('button');
            btnConvertir.textContent = 'Convertir';
            btnConvertir.classList.add('convertir-btn');
            divVenta.appendChild(btnConvertir);

            const historialVentaDiv = document.createElement('div');
            historialVentaDiv.classList.add('historial');
            divVenta.appendChild(historialVentaDiv);

            mostrarHistorialVenta();

            function mostrarHistorialVenta() {
                historialVentaDiv.innerHTML = '';

                historialConversiones.forEach(function (conversion) {
                    const conversionHTML = `
              <div class="conversion">
                <div class="cantidad">${conversion.cantidadPesos} pesos argentinos</div>
                <div class="resultado">= ${conversion.resultado}</div>
              </div>`;
                    historialVentaDiv.insertAdjacentHTML('beforeend', conversionHTML);
                });

                const btnBorrarHistorial = document.createElement('button');
                btnBorrarHistorial.textContent = 'Borrar historial';
                btnBorrarHistorial.classList.add('borrar-btn');
                historialVentaDiv.appendChild(btnBorrarHistorial);

                btnBorrarHistorial.addEventListener('click', function () {
                    historialConversiones = [];
                    historialVentaDiv.innerHTML = '';
                    guardarDatos();
                });
            }

            btnConvertir.addEventListener('click', function () {
                cantidadPesos = inputCantidadPesos.value;

                historialVentaDiv.innerHTML = '';

                divisas.forEach(function (divisa) {
                    const cantidadDivisa = cantidadPesos / divisa.valorBlue;

                    const resultadoDivisa = document.createElement('div');
                    resultadoDivisa.textContent = `Recibirás ${cantidadDivisa.toFixed(2)} ${divisa.nombre}`;
                    historialVentaDiv.appendChild(resultadoDivisa);
                });

                historialConversiones.push({
                    cantidadPesos: cantidadPesos,
                    resultado: historialVentaDiv.innerHTML,
                });

                guardarDatos();
                mostrarHistorialVenta();
            });

            venderAbierto = true;
        } else {
            const divVenta = document.querySelector('.tarjeta-venta');
            if (divVenta) {
                divVenta.remove();
            }
            venderAbierto = false;
        }
    }
});

const cardCompra = document.getElementById('card-compra');

cardCompra.addEventListener('click', redirectToApp2);

function redirectToApp2() {
    window.location.href = "aplicacion2.html";
}
