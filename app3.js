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

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.getElementsByClassName('card');
    let activeDivisasContainer = null;

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function (event) {
            const existingDivisasContainer = this.querySelector('.divisas-container');

            if (activeDivisasContainer && activeDivisasContainer !== existingDivisasContainer) {
                activeDivisasContainer.remove();
            }

            if (existingDivisasContainer) {
                existingDivisasContainer.remove();
                activeDivisasContainer = null;
            } else {
                const continente = this.getAttribute('data-continente');
                const divisasContinentes = divisas.filter(function (divisa) {
                    return divisa.continente === continente;
                });

                const divisasContainer = document.createElement('div');
                divisasContainer.classList.add('divisas-container');

                divisasContinentes.forEach(function (divisa) {
                    const divisaItem = document.createElement('div');
                    divisaItem.classList.add('divisa-item');

                    const nombreDivisa = document.createElement('p');
                    nombreDivisa.textContent = divisa.nombre;

                    const cantidadInput = document.createElement('input');
                    cantidadInput.type = 'number';
                    cantidadInput.placeholder = 'Ingrese la cantidad de ' + divisa.nombre.toLowerCase();

                    cantidadInput.addEventListener('click', function (event) {
                        event.stopPropagation();
                    });

                    const confirmButton = document.createElement('button');
                    confirmButton.textContent = 'Agregar al carrito';

                    confirmButton.addEventListener('click', function () {
                        const cantidadDivisas = cantidadInput.value;

                        if (cantidadDivisas) {
                            const valorBlue = divisa.valorBlue;
                            const cantidadPesos = cantidadDivisas * valorBlue;

                            const carrito = document.getElementById('carrito');

                            const carritoItem = document.createElement('div');
                            carritoItem.classList.add('carrito-item');

                            const nombreDivisaCarrito = document.createElement('p');
                            nombreDivisaCarrito.textContent = divisa.nombre;

                            const cantidad = document.createElement('p');
                            cantidad.textContent = 'Cantidad: ' + cantidadDivisas + ' (' + cantidadPesos.toFixed(2) + ' pesos argentinos)';

                            const deleteButton = document.createElement('button');
                            deleteButton.textContent = 'Eliminar';

                            deleteButton.addEventListener('click', function () {
                                carrito.removeChild(carritoItem);
                                actualizarDatosCarrito();
                            });

                            carritoItem.appendChild(nombreDivisaCarrito);
                            carritoItem.appendChild(cantidad);
                            carritoItem.appendChild(deleteButton);

                            carrito.appendChild(carritoItem);

                            actualizarDatosCarrito();
                        }
                    });

                    divisaItem.appendChild(nombreDivisa);
                    divisaItem.appendChild(cantidadInput);
                    divisaItem.appendChild(confirmButton);

                    divisasContainer.appendChild(divisaItem);
                });

                this.appendChild(divisasContainer);
                activeDivisasContainer = divisasContainer;
            }

            event.stopPropagation();
        });
    }

    function actualizarDatosCarrito() {
        const carritoItems = Array.from(document.querySelectorAll('#carrito .carrito-item'));

        const carritoData = carritoItems.map(function (item) {
            return {
                nombre: item.querySelector('p:nth-child(1)').textContent,
                cantidad: item.querySelector('p:nth-child(2)').textContent
            };
        });

        localStorage.setItem('carritoItems', JSON.stringify(carritoData));
    }

    function cargarDatosCarrito() {
        const carritoItems = localStorage.getItem('carritoItems');

        if (carritoItems) {
            const carritoItemsArray = JSON.parse(carritoItems);

            carritoItemsArray.forEach(function (item) {
                const carrito = document.getElementById('carrito');

                const carritoItem = document.createElement('div');
                carritoItem.classList.add('carrito-item');

                const nombreDivisaCarrito = document.createElement('p');
                nombreDivisaCarrito.textContent = item.nombre;

                const cantidad = document.createElement('p');
                cantidad.textContent = item.cantidad;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';

                deleteButton.addEventListener('click', function () {
                    carrito.removeChild(carritoItem);
                    actualizarDatosCarrito();
                });

                carritoItem.appendChild(nombreDivisaCarrito);
                carritoItem.appendChild(cantidad);
                carritoItem.appendChild(deleteButton);

                carrito.appendChild(carritoItem);
            });
        }
    }

    cargarDatosCarrito();
});

