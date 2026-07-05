const mensajes = [
    "Mamá, gracias por ser mi guía, mi apoyo y mi refugio.",
    "Tu amor hace más hermoso el hogar y más fuerte mi corazón.",
    "No hay regalo más grande que tener una madre como tú.",
    "Gracias por cada abrazo, cada consejo y cada sacrificio.",
    "Tu ternura y tu fuerza son una bendición para nuestra familia.",
    "Mamá, tu amor es una luz que nunca se apaga.",
    "Eres ejemplo de amor, paciencia, valentía y dulzura.",
    "Hoy celebramos tu vida, porque tu vida es un regalo para todos."
];

const bendiciones = [
    "Que Dios te bendiga con salud, paz, alegría y muchos años más de vida.",
    "Que este cumpleaños esté lleno de abrazos, sonrisas y momentos inolvidables.",
    "Que tu corazón reciba todo el amor que tú siempre nos has dado.",
    "Que cada día de este nuevo año de vida venga lleno de bendiciones.",
    "Que nunca te falten motivos para sonreír y sentirte amada.",
    "Que Dios te cuide, te fortalezca y te llene de felicidad.",
    "Que tu vida siga floreciendo como un jardín hermoso lleno de amor."
];

let indiceMensaje = 0;
let musicaActiva = false;
let audioContext;
let intervaloMusica;

function iniciarPagina() {
    mostrarMensajeActual();

    setInterval(() => {
        crearElementoFlotante();
    }, 2300);
}

function abrirCarta() {
    const carta = document.getElementById("letterSection");
    carta.classList.add("show");
    carta.scrollIntoView({ behavior: "smooth" });

    crearElementosFlotantes(24);
}

function lanzarCelebracion() {
    crearElementosFlotantes(32);
    lanzarConfetti(80);
    mostrarBendicionFinal();
}

function mostrarMensajeActual() {
    const caja = document.getElementById("messageBox");
    caja.textContent = mensajes[indiceMensaje];
}

function cambiarMensaje(direccion) {
    indiceMensaje += direccion;

    if (indiceMensaje < 0) {
        indiceMensaje = mensajes.length - 1;
    }

    if (indiceMensaje >= mensajes.length) {
        indiceMensaje = 0;
    }

    const caja = document.getElementById("messageBox");
    caja.style.opacity = "0";
    caja.style.transform = "scale(0.96)";

    setTimeout(() => {
        caja.textContent = mensajes[indiceMensaje];
        caja.style.opacity = "1";
        caja.style.transform = "scale(1)";
    }, 180);

    crearElementosFlotantes(5);
}

function voltearTarjeta(tarjeta) {
    tarjeta.classList.toggle("flipped");
    crearElementosFlotantes(8);
}

function apagarVelas() {
    const seccion = document.querySelector(".cake-section");
    const mensaje = document.getElementById("cakeMessage");

    seccion.classList.add("candles-out");
    mensaje.textContent = "¡Deseo pedido! Que mamá tenga un año lleno de amor, salud y bendiciones.";

    lanzarConfetti(60);
    crearElementosFlotantes(18);
}

function abrirRecuerdo(texto) {
    const modal = document.getElementById("memoryModal");
    const modalText = document.getElementById("modalText");

    modalText.textContent = texto;
    modal.classList.add("show");

    crearElementosFlotantes(10);
}

function cerrarRecuerdo() {
    const modal = document.getElementById("memoryModal");
    modal.classList.remove("show");
}

function agregarDeseo() {
    const input = document.getElementById("wishInput");
    const jar = document.getElementById("wishJar");
    const texto = input.value.trim();

    if (texto === "") {
        input.placeholder = "Primero escribe un deseo bonito para mamá";
        crearElementosFlotantes(4);
        return;
    }

    const nota = document.createElement("div");
    nota.classList.add("wish-note");
    nota.textContent = texto;

    jar.appendChild(nota);
    input.value = "";

    crearElementosFlotantes(14);
}

function mostrarBendicionFinal() {
    const finalBlessing = document.getElementById("finalBlessing");
    const numero = Math.floor(Math.random() * bendiciones.length);

    finalBlessing.style.opacity = "0";

    setTimeout(() => {
        finalBlessing.textContent = bendiciones[numero];
        finalBlessing.style.opacity = "1";
    }, 180);

    crearElementosFlotantes(16);
}

function elegirFigura() {
    const figuras = ["❤️", "💖", "💕", "🌹", "🌸", "💐", "🌷", "✨", "🎂", "👑"];
    const numero = Math.floor(Math.random() * figuras.length);
    return figuras[numero];
}

function crearElementoFlotante() {
    const capa = document.getElementById("floatingLayer");
    const elemento = document.createElement("div");

    elemento.classList.add("float-item");
    elemento.textContent = elegirFigura();

    elemento.style.left = Math.random() * 100 + "vw";
    elemento.style.fontSize = Math.random() * 18 + 20 + "px";
    elemento.style.animationDuration = Math.random() * 2.5 + 4 + "s";

    capa.appendChild(elemento);

    setTimeout(() => {
        elemento.remove();
    }, 7000);
}

function crearElementosFlotantes(cantidad) {
    for (let i = 0; i < cantidad; i++) {
        setTimeout(() => {
            crearElementoFlotante();
        }, i * 90);
    }
}

function lanzarConfetti(cantidad) {
    const capa = document.getElementById("confettiLayer");
    const colores = ["#ff8fab", "#d6336c", "#ffd43b", "#74c0fc", "#95d5b2", "#ffffff"];

    for (let i = 0; i < cantidad; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        const color = colores[Math.floor(Math.random() * colores.length)];

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.background = color;
        confetti.style.animationDuration = Math.random() * 2.5 + 3 + "s";
        confetti.style.animationDelay = Math.random() * 0.4 + "s";

        capa.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 6500);
    }
}

function controlarMusica() {
    const boton = document.getElementById("musicBtn");

    if (!musicaActiva) {
        iniciarMusica();
        musicaActiva = true;
        boton.textContent = "Pausar música";
    } else {
        detenerMusica();
        musicaActiva = false;
        boton.textContent = "Música suave";
    }
}

function iniciarMusica() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    tocarMelodia();

    intervaloMusica = setInterval(() => {
        tocarMelodia();
    }, 5200);
}

function detenerMusica() {
    clearInterval(intervaloMusica);
}

function tocarNota(frecuencia, inicio, duracion) {
    if (!audioContext) {
        return;
    }

    const oscilador = audioContext.createOscillator();
    const ganancia = audioContext.createGain();

    oscilador.type = "sine";
    oscilador.frequency.value = frecuencia;

    ganancia.gain.setValueAtTime(0.0001, audioContext.currentTime + inicio);
    ganancia.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + inicio + 0.05);
    ganancia.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + inicio + duracion);

    oscilador.connect(ganancia);
    ganancia.connect(audioContext.destination);

    oscilador.start(audioContext.currentTime + inicio);
    oscilador.stop(audioContext.currentTime + inicio + duracion + 0.05);
}

function tocarMelodia() {
    tocarNota(523.25, 0, 0.5);
    tocarNota(659.25, 0.55, 0.5);
    tocarNota(783.99, 1.1, 0.7);
    tocarNota(659.25, 1.9, 0.5);
    tocarNota(698.46, 2.45, 0.5);
    tocarNota(783.99, 3, 0.9);
}

document.addEventListener("click", function(event) {
    const modal = document.getElementById("memoryModal");

    if (event.target === modal) {
        cerrarRecuerdo();
    }
});

window.onload = iniciarPagina;
