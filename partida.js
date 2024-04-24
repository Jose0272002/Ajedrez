document.addEventListener("DOMContentLoaded", cargarEventos);

let piezaSeleccionada = null;
let casillaDestino = null;
let turno = "blanco";
let movimientos = []


function cargarEventos() {
	let pathElements = document.querySelectorAll("path");
	pathElements.forEach(function (pathElement) {
		pathElement.style.pointerEvents = "none";
	});

	let piezas = document.querySelectorAll('.pieza');
	let casillas = document.querySelectorAll('td');

	piezas.forEach(function (elemento) {
		elemento.addEventListener('click', seleccionarPieza);
	});

	casillas.forEach(function (casilla) {
		casilla.addEventListener('click', moverPieza);
	});

	mostrarJaque()
	var tipoPieza = []
	var casillasOcupadas = []
	for (pieza of piezas) {
		tipoPieza.push(pieza.id)
		casillasOcupadas.push(pieza.parentNode.id)
	}

}


function seleccionarPieza(event) {
	let piezasElegidas = document.querySelectorAll('.seleccionada');
	if (!event.target.classList.contains(turno)) {
		return;
	}
	piezasElegidas.forEach(function (elemento) {
		elemento.classList.remove('seleccionada');
	});

	let x = event.target;
	x.parentNode.classList.add("seleccionada");
	piezaSeleccionada = x;
	movimientos.push(piezaSeleccionada.id)
	pieza = x;
	casillaDestino = null;
	eliminarMarcasCasillasDisponibles();
	marcarCasillasDisponibles(obtenerCasillasDisponibles(x.parentNode.id));

}

function moverPieza(event) {
	let casilla = event.target;
	if (casilla.classList.contains("disponible")) {
		casilla.innerHTML = piezaSeleccionada.outerHTML;
		piezaSeleccionada.parentNode.innerHTML = "";
		piezaSeleccionada = null;
		casillaDestino = null;
		eliminarMarcasCasillasDisponibles();
		let posActual = event.target.parentNode.id;
		let posDestino = casilla.id;
		let destino = document.getElementById(posDestino);
		console.log(posActual + "      " + posDestino);

		let [fila, columna] = posDestino.split(".");
		let letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
		if (columna) {
			columna = letras[columna - 1]
		}
		movimientos.push([fila, columna])
		console.log(movimientos)
		cargarEventos();
		if (posDestino !== posActual && !destino.classList.contains("pieza")) {
			turno = turno === "blanco" ? "negro" : "blanco";
		}
		let piezas = document.querySelectorAll('.pieza');
		if (turno === "negro") {
			document.querySelector(".tablero-container").classList.add("turno-negro");
			for (let i = 0; i < piezas.length; i++) {
				piezas[i].classList.add("vuelta")
			}
		} else {
			document.querySelector(".tablero-container").classList.remove("turno-negro");
			for (let i = 0; i < piezas.length; i++) {
				piezas[i].classList.remove("vuelta")
			}
		}
		console.log(turno);
		reiniciarTemporizador()
		cargarEventos();
	}
}

function obtenerCasillasDisponibles(posicion) {
	let [fila, columna] = posicion.split(".");
	let casillasDisponibles = [];

	if ((piezaSeleccionada && piezaSeleccionada.classList.contains("negro") && piezaSeleccionada.classList.contains("peon"))
		|| (pieza && pieza.classList.contains("negro") && pieza.classList.contains("peon"))) {

		document.getElementById(casillaDestino)
		//si está en la casilla inicial
		if (fila == 7) {
			let filaDestino = parseInt(fila) - 1;
			let casillaDestino = filaDestino + "." + columna;
			casillasDisponibles.push(casillaDestino);

			let casillaSiguiente = document.getElementById(casillaDestino);

			let filaDestino1 = parseInt(fila) - 2;
			let casillaDestino1 = filaDestino1 + "." + columna;
			let dosAdelante = document.getElementById(casillaDestino1)

			//si no hay alguna pieza ocupando las casillas de delante
			if (casillaSiguiente.innerHTML === "" && dosAdelante.innerHTML === "") {
				casillasDisponibles.push(casillaDestino1);
			}
			//si hay alguna pieza rival en la casilla perpendicular adyacente tanto a izquierda como a derecha

			if ((document.getElementById((parseInt(fila) - 1) + "." + (parseInt(columna) - 1)) != null
				&& document.getElementById((parseInt(fila) - 1) + "." + (parseInt(columna) - 1)).innerHTML == "")) {

			} else {
				let filaDestino2 = parseInt(fila) - 1;
				let casillaDestino2 = filaDestino2 + "." + (parseInt(columna) - 1);
				casillasDisponibles.push(casillaDestino2);
			}
			if ((document.getElementById((parseInt(fila) - 1) + "." + (parseInt(columna) + 1)) != null
				&& document.getElementById((parseInt(fila) - 1) + "." + (parseInt(columna) + 1)).innerHTML == "")) {

			} else {
				let filaDestino3 = parseInt(fila) - 1;
				let casillaDestino3 = filaDestino3 + "." + (parseInt(columna) + 1);
				casillasDisponibles.push(casillaDestino3);
			}
			// en las demás casillas 
		} else {
			let filaDestino = parseInt(fila) - 1;
			let casillaDestino = filaDestino + "." + columna;
			casillasDisponibles.push(casillaDestino);
			//si hay alguna pieza rival en la casilla perpendicular adyacente tanto a izquierda como a derecha
			if ((document.getElementById((parseInt(fila) - 1) + "." + (parseInt(columna) - 1)) != null
				&& document.getElementById((parseInt(fila) - 1) + "." + (parseInt(columna) - 1)).innerHTML == "")) {

			} else {
				let filaDestino2 = parseInt(fila) - 1;
				let casillaDestino2 = filaDestino2 + "." + (parseInt(columna) - 1);
				casillasDisponibles.push(casillaDestino2);
			}
			if ((document.getElementById((parseInt(fila) - 1) + "." + (parseInt(columna) + 1)) != null
				&& document.getElementById((parseInt(fila) - 1) + "." + (parseInt(columna) + 1)).innerHTML == "")) {

			} else {
				let filaDestino3 = parseInt(fila) - 1;
				let casillaDestino3 = filaDestino3 + "." + (parseInt(columna) + 1);
				casillasDisponibles.push(casillaDestino3);
			}
		}
		//si es blanca y un peón
	} else if (piezaSeleccionada && piezaSeleccionada.classList.contains("blanco") && piezaSeleccionada.classList.contains("peon")
		|| pieza && pieza.classList.contains("blanco") && pieza.classList.contains("peon")) {
		if (fila == 2) {
			let filaDestino = parseInt(fila) + 1;
			let casillaDestino = filaDestino + "." + columna;
			casillasDisponibles.push(casillaDestino);

			let casillaSiguiente = document.getElementById(casillaDestino);

			let filaDestino1 = parseInt(fila) + 2;
			let casillaDestino1 = filaDestino1 + "." + columna;
			let dosAdelante = document.getElementById(casillaDestino1)
			//si no hay alguna pieza ocupando las casillas de delante
			if (casillaSiguiente.innerHTML === "" && dosAdelante.innerHTML === "") {
				casillasDisponibles.push(casillaDestino1);
			}
			//si hay alguna pieza rival en la casilla perpendicular adyacente tanto a izquierda como a derecha

			if ((document.getElementById((parseInt(fila) + 1) + "." + (parseInt(columna) - 1)) != null
				&& document.getElementById((parseInt(fila) + 1) + "." + (parseInt(columna) - 1)).innerHTML == "")) {

			} else {
				let filaDestino2 = parseInt(fila) + 1;
				let casillaDestino2 = filaDestino2 + "." + (parseInt(columna) - 1);
				casillasDisponibles.push(casillaDestino2);
			}
			if ((document.getElementById((parseInt(fila) + 1) + "." + (parseInt(columna) + 1)) != null
				&& document.getElementById((parseInt(fila) + 1) + "." + (parseInt(columna) + 1)).innerHTML == "")) {

			} else {
				let filaDestino3 = parseInt(fila) + 1;
				let casillaDestino3 = filaDestino3 + "." + (parseInt(columna) + 1);
				casillasDisponibles.push(casillaDestino3);
			}
			// en las demás casillas 
		} else {
			let filaDestino = parseInt(fila) + 1;
			let casillaDestino = filaDestino + "." + columna;
			casillasDisponibles.push(casillaDestino);
			//si hay alguna pieza rival en la casilla perpendicular adyacente tanto a izquierda como a derecha
			if ((document.getElementById((parseInt(fila) + 1) + "." + (parseInt(columna) - 1)) != null
				&& document.getElementById((parseInt(fila) + 1) + "." + (parseInt(columna) - 1)).innerHTML == "")) {

			} else {
				let filaDestino2 = parseInt(fila) + 1;
				let casillaDestino2 = filaDestino2 + "." + (parseInt(columna) - 1);
				casillasDisponibles.push(casillaDestino2);
			}
			if ((document.getElementById((parseInt(fila) + 1) + "." + (parseInt(columna) + 1)) != null
				&& document.getElementById((parseInt(fila) + 1) + "." + (parseInt(columna) + 1)).innerHTML == "")) {

			} else {
				let filaDestino3 = parseInt(fila) + 1;
				let casillaDestino3 = filaDestino3 + "." + (parseInt(columna) + 1);
				casillasDisponibles.push(casillaDestino3);
			}
		}

		// si es un caballo 
	} else if (piezaSeleccionada && piezaSeleccionada.classList.contains("caballo")
		|| pieza && pieza.classList.contains("caballo")) {
		let movimientosCaballo = [
			[2, 1], [2, -1], [-2, 1], [-2, -1],
			[1, 2], [1, -2], [-1, 2], [-1, -2]
		];

		movimientosCaballo.forEach((movimiento) => {
			let filaDestino = parseInt(fila) + movimiento[0];
			let columnaDestino = parseInt(columna) + movimiento[1];
			let casillaDestino = filaDestino + "." + columnaDestino;
			casillasDisponibles.push(casillaDestino);
		});
		// si es un alfil 
	} else if (piezaSeleccionada && piezaSeleccionada.classList.contains("alfil")
		|| pieza && pieza.classList.contains("alfil")) {
		let movimientosAlfil = [
			[[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],//abajo derecha
			[[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]],//arriba izquierda
			[[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]],//arriba derecha
			[[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]]//abajo izquierda 
		];
		for (let i = 0; i < movimientosAlfil.length; i++) {
			for (let j = 0; j < movimientosAlfil[i].length; j++) {
				let movimiento = movimientosAlfil[i][j];
				let filaDestino = parseInt(fila) + movimiento[0];
				let columnaDestino = parseInt(columna) + movimiento[1];
				let casillaDestino = filaDestino + "." + columnaDestino;

				// Primero se comprueba que la casilla esté en el tablero
				if (document.getElementById(casillaDestino) !== null) {
					let casilla = document.getElementById(casillaDestino);

					// Verificar si la casilla contiene una pieza del mismo color
					if (((piezaSeleccionada && piezaSeleccionada.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("blanco")) ||
						(piezaSeleccionada && piezaSeleccionada.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("negro"))
						|| (pieza && pieza.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("blanco")) ||
						(pieza && pieza.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("negro")))) {
						break; // No se puede mover más allá, se sale del bucle for
					}
					// Verificar si la casilla está vacía
					else if (casilla.innerHTML === "") {
						casillasDisponibles.push(casillaDestino);
					}
					// Verificar si la casilla contiene una pieza del color contrario
					else if (((piezaSeleccionada && piezaSeleccionada.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("negro")) ||
						(piezaSeleccionada && piezaSeleccionada.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("blanco"))
						|| (pieza && pieza.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("negro")) ||
						(pieza && pieza.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("blanco")))) {
						casillasDisponibles.push(casillaDestino);
						break; // No se puede mover más allá, se sale del bucle for
					}
				}
			}
		}
	}    // si es una torre 
	else if (piezaSeleccionada && piezaSeleccionada.classList.contains("torre") || pieza && pieza.classList.contains("torre")) {
		let movimientosTorre = [
			[[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],//abajo
			[[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]],//arriba
			[[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],//derecha
			[[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]]//izquierda
		];
		for (let i = 0; i < movimientosTorre.length; i++) {
			for (let j = 0; j < movimientosTorre[i].length; j++) {
				let movimiento = movimientosTorre[i][j];
				let filaDestino = parseInt(fila) + movimiento[0];
				let columnaDestino = parseInt(columna) + movimiento[1];
				let casillaDestino = filaDestino + "." + columnaDestino;

				// Primero se comprueba que la casilla esté en el tablero
				if (document.getElementById(casillaDestino) !== null) {
					let casilla = document.getElementById(casillaDestino);

					// Verificar si la casilla contiene una pieza del mismo color
					if (((piezaSeleccionada && piezaSeleccionada.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("blanco")) ||
						(piezaSeleccionada && piezaSeleccionada.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("negro")))
						|| ((pieza && pieza.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("blanco")) ||
							(pieza && pieza.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("negro")))) {
						break; // No se puede mover más allá, se sale del bucle for
					}
					// Verificar si la casilla está vacía
					else if (casilla.innerHTML === "") {
						casillasDisponibles.push(casillaDestino);
					}
					// Verificar si la casilla contiene una pieza del color contrario
					else if (((piezaSeleccionada && piezaSeleccionada.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("negro")) ||
						(piezaSeleccionada && piezaSeleccionada.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("blanco"))
						|| (pieza && pieza.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("negro")) ||
						(pieza && pieza.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("blanco")))) {
						casillasDisponibles.push(casillaDestino);
						break; // No se puede mover más allá, se sale del bucle for
					}
				}
			}
		}
	}
	// si es una dama 
	else if (piezaSeleccionada && piezaSeleccionada.classList.contains("dama") || pieza && pieza.classList.contains("dama")) {
		let movimientosDama = [
			[[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],//abajo derecha
			[[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]],//arriba izquierda
			[[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]],//arriba derecha
			[[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],//abajo izquierda

			[[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],//abajo
			[[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]],//arriba
			[[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],//derecha
			[[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]]//izquierda
		];

		for (let i = 0; i < movimientosDama.length; i++) {
			for (let j = 0; j < movimientosDama[i].length; j++) {
				let movimiento = movimientosDama[i][j];
				let filaDestino = parseInt(fila) + movimiento[0];
				let columnaDestino = parseInt(columna) + movimiento[1];
				let casillaDestino = filaDestino + "." + columnaDestino;

				// Primero se comprueba que la casilla esté en el tablero
				if (document.getElementById(casillaDestino) !== null) {
					let casilla = document.getElementById(casillaDestino);

					// Verificar si la casilla contiene una pieza del mismo color
					if (((piezaSeleccionada && piezaSeleccionada.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("blanco")) ||
						(piezaSeleccionada && piezaSeleccionada.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("negro"))
						|| (pieza && pieza.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("blanco")) ||
						(pieza && pieza.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("negro")))) {
						break; // No se puede mover más allá, se sale del bucle for
					}
					// Verificar si la casilla está vacía
					else if (casilla.innerHTML === "") {
						casillasDisponibles.push(casillaDestino);
					}
					// Verificar si la casilla contiene una pieza del color contrario
					else if (((piezaSeleccionada && piezaSeleccionada.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("negro")) ||
						(piezaSeleccionada && piezaSeleccionada.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("blanco"))
						|| (pieza && pieza.classList.contains("blanco") && casilla.firstChild && casilla.firstChild.classList.contains("negro")) ||
						(pieza && pieza.classList.contains("negro") && casilla.firstChild && casilla.firstChild.classList.contains("blanco")))) {
						casillasDisponibles.push(casillaDestino);

						break; // No se puede mover más allá, se sale del bucle for
					}
				}
			}
		}
		// si es un rey 
	} else if (piezaSeleccionada && piezaSeleccionada.classList.contains("rey") || pieza && pieza.classList.contains("rey")) {
		let movimientosRey = [
			[1, 0], [-1, 0], [0, 1], [0, -1],
			[1, 1], [1, -1], [-1, -1], [-1, 1]

		];

		movimientosRey.forEach((movimiento) => {
			let filaDestino = parseInt(fila) + movimiento[0];
			let columnaDestino = parseInt(columna) + movimiento[1];
			let casillaDestino = filaDestino + "." + columnaDestino;
			casillasDisponibles.push(casillaDestino);
		});
	}

	// aquí se devuelve las casillas a las que se pueden mover las piezas 
	return casillasDisponibles
}
// añade la clase disponible a cada casilla que le corresponda
function marcarCasillasDisponibles(casillas) {
	casillas.forEach(function (casilla) {
		let elementoCasilla = document.getElementById(casilla);
		if (elementoCasilla) {
			let piezaEnCasilla = elementoCasilla.firstChild;
			// si la casilla está vacía o la pieza no es del mismo color que la pieza seleccionada la casilla está disponible
			if (!piezaEnCasilla || piezaEnCasilla.classList.contains(piezaSeleccionada.classList.contains("blanco") ? "negro" : "blanco")) {
				elementoCasilla.classList.add("disponible");
			}
			// si es un peón y en la siguiente casilla hay algo esta deja de estar disponible
			if (piezaSeleccionada && piezaSeleccionada.classList.contains("peon") && piezaEnCasilla
				&& (parseFloat(piezaSeleccionada.parentNode.id) == parseFloat(elementoCasilla.id) + 1
					|| parseFloat(piezaSeleccionada.parentNode.id) == parseFloat(elementoCasilla.id) - 1)) {
				elementoCasilla.classList.remove("disponible");
			}
			if (piezaSeleccionada && piezaSeleccionada.classList.contains("rey")) {
				let rey = document.querySelector('.rey.' + turno);
				let posicionRey = rey.parentNode.id;

				let piezasOponente = document.querySelectorAll('.pieza.' + (turno === 'blanco' ? 'negro' : 'blanco'));

				for (pieza of piezasOponente) {
					let posicionesAtacadas = obtenerCasillasDisponibles(pieza.parentNode.id);
					for (posicionAtacada of posicionesAtacadas) {
						console.log(elementoCasilla)
						console.log(document.getElementById(posicionAtacada))
						if (posicionAtacada && document.getElementById(posicionAtacada) === elementoCasilla) {
							elementoCasilla.classList.remove("disponible")
						}

					}
				}
			}
		}
	});
}

function reyEnJaque() {
	if (document.querySelector('.rey.' + (turno === 'blanco' ? 'negro' : 'blanco'))) {
		let rey = document.querySelector('.rey.' + turno);
		if (rey == null) {

		} else {
			let posicionRey = rey.parentNode.id;

			let piezasOponente = document.querySelectorAll('.pieza.' + (turno === 'blanco' ? 'negro' : 'blanco'));

			for (pieza of piezasOponente) {
				let posicionesAtacadas = obtenerCasillasDisponibles(pieza.parentNode.id);
				if (posicionesAtacadas.includes(posicionRey)) {
					return true;
				}
				console.log()
			}
		}


		return false;
	} else {
		return 1
	}

}


function mostrarJaque() {
	if (reyEnJaque() === 1) {
		alert("jaque mate")
		finalizarTemporizador()
		let ganador = turno;
		enviar(ganador)
		alert("victoria " + ganador)
		window.location.reload();

	}
	else if (document.querySelector('.rey.' + (turno === 'blanco' ? 'negro' : 'blanco'))) {
		let rey = document.querySelector('.rey.' + turno);
		if (rey){
			let posicionRey = rey.parentNode.id;

		if (reyEnJaque() === true) {
			document.getElementById(posicionRey).classList.add("jaque")
		}
		else {
			document.getElementById(posicionRey).classList.remove("jaque")
			let casillas = document.querySelectorAll("td")
			for (casilla of casillas) {
				casilla.classList.remove("jaque")
			}
		}
		}
		
	}
}

// elimina la clase disponible de las casillas  
function eliminarMarcasCasillasDisponibles() {
	let casillasDisponibles = document.querySelectorAll('.disponible');
	casillasDisponibles.forEach(function (casilla) {
		casilla.classList.remove("disponible");
	});
}

//temporizador
var duracionMinutos = 0.2;
var duracionMilisegundos = duracionMinutos * 60 * 1000;
var cuentaRegresivaElemento = document.getElementById("temporizador");

// Función para actualizar la cuenta regresiva
function actualizarCuentaRegresiva() {
	// Obtener la fecha y hora actual
	var ahora = new Date().getTime();

	// Calcular la diferencia entre la fecha y hora actual y la fecha y hora objetivo
	var diferencia = tiempoObjetivo - ahora;

	// Calcular los minutos y segundos restantes
	var minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
	var segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

	// Mostrar la cuenta regresiva en el elemento HTML
	cuentaRegresivaElemento.innerHTML = minutos + " minutos " + segundos + " segundos";

	// Si la cuenta regresiva ha terminado, mostrar un mensaje o realizar alguna acción
	if (diferencia < 0 && turno === "negro") {
		cuentaRegresivaElemento.innerHTML = "¡Tiempo terminado! victoria blancas";
		ganador = "blanco"
		finalizarTemporizador()
		alert("gana " + ganador + " por tiempo")
		enviar(ganador)
		window.location.reload();

	}
	else if (diferencia < 0 && turno === "blanco") {
		cuentaRegresivaElemento.innerHTML = "¡Tiempo terminado! victoria negras";
		ganador = "negro"
		finalizarTemporizador()
		alert("gana " + ganador + " por tiempo")
		enviar(ganador)
		window.location.reload();

	}
}
function iniciarTemporizador() {
	// Obtener la fecha y hora objetivo para el primer temporizador sumando la duración en milisegundos a la fecha y hora actual
	tiempoObjetivo = new Date().getTime() + duracionMilisegundos;

	// Actualizar la cuenta regresiva del primer temporizador cada segundo
	temporizador = setInterval(actualizarCuentaRegresiva, 1000);
}
function finalizarTemporizador() {
	clearTimeout(temporizador);
	temporizador = null;
}
function reiniciarTemporizador() {
	clearInterval(temporizador)
	iniciarTemporizador()
}
iniciarTemporizador()


function enviar(x) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		document.getElementById("x").innerHTML = this.responseText;
	};
	xhttp.open("POST", "partida.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	console.log(x)
	xhttp.send("ganador=" + encodeURIComponent(JSON.stringify(x)));
}




