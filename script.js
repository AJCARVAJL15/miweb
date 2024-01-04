// Obtener elementos del DOM
const agregarJugadorForm = document.getElementById('agregarJugadorForm');
const nombreJugadorInput = document.getElementById('nombreJugador');
const jugadoresTabla = document.getElementById('jugadoresTabla');
const agregarRondaBtn = document.getElementById('agregarRondaBtn');
const totalSuma = document.getElementById('totalSuma');
const rondasTabla = document.getElementById('rondasTabla');

// Arreglo para almacenar jugadores y sus puntajes por ronda
const jugadores = [];

// Manejador de eventos para agregar jugador
agregarJugadorForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombreJugador = nombreJugadorInput.value;
    if (nombreJugador !== '') {
        jugadores.push({ nombre: nombreJugador, valor: 0, puntajes: [] });
        actualizarTabla();
        nombreJugadorInput.value = '';
    }
});

// Actualizar tabla de jugadores
function actualizarTabla() {
    jugadoresTabla.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Puntaje Total</th> <!-- Agregamos una nueva columna para el puntaje total -->
        </tr>
        ${jugadores.map(jugador => `
            <tr>
                <td>${jugador.nombre}</td>
                <td>${jugador.valor}</td>
                <td>${jugador.puntajes.reduce((total, puntaje) => total + puntaje, 0)}</td> <!-- Mostramos el puntaje total -->
            </tr>
        `).join('')}
    `;
    actualizarTotal();
}

// Manejador de eventos para añadir ronda
agregarRondaBtn.addEventListener('click', () => {
    const puntajesRonda = [];
    jugadores.forEach(jugador => {
        const valor = parseInt(prompt(`Ingrese el valor para ${jugador.nombre} en la ronda:`));
        if (!isNaN(valor)) {
            jugador.valor += valor;
            jugador.puntajes.push(valor);
            puntajesRonda.push(`<td>${valor}</td>`);
        }
    });
    rondasTabla.innerHTML += `
        <tr>
            <td>Ronda ${jugadores[0].puntajes.length}</td>
            ${puntajesRonda.join('')}
        </tr>
    `;
    actualizarTabla();
});


// Actualizar total de la suma
function actualizarTotal() {
    let suma = jugadores.reduce((total, jugador) => total + jugador.valor, 0);
    const jugadoresOrdenados = jugadores.sort((a, b) => b.valor - a.valor); // Ordenar jugadores por puntaje descendente
    let jugadorMasCercano = null;
    let distanciaMasCercana = Infinity;

    jugadoresOrdenados.forEach(jugador => {
        const distancia = Math.abs(100 - jugador.valor); // Calcular distancia a 100 puntos
        if (distancia < distanciaMasCercana) {
            distanciaMasCercana = distancia;
            jugadorMasCercano = jugador;
        }
    });

    if (jugadorMasCercano !== null) {
        totalSuma.textContent = `${jugadorMasCercano.nombre} está más cerca de 100 con ${jugadorMasCercano.valor} puntos.`;
    } else {
        totalSuma.textContent = `Total: ${suma}`;
    }
}

