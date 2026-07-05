const mensajesCarrusel = [
    "Mamá, gracias por ser mi guía, mi apoyo y mi refugio.",
    "Tu amor hace más hermosa la vida y más cálido el hogar.",
    "Eres una bendición inmensa y una mujer admirable.",
    "No hay regalo más grande que tener una madre como tú.",
    "Tu ternura, fortaleza y amor hacen brillar a la familia.",
    "Mamá, tu corazón es uno de los lugares más bonitos del mundo."
];

const bendiciones = [
    "Mamá, que Dios te bendiga con salud, alegría, paz y muchos años de vida.",
    "Que este cumpleaños esté lleno de amor, abrazos, sonrisas y momentos inolvidables.",
    "Eres una mujer maravillosa. Gracias por dar tanto amor a nuestra familia.",
    "Que tu vida siga floreciendo como un jardín hermoso lleno de bendiciones.",
    "Hoy celebramos tu existencia, tu ternura, tu fortaleza y tu inmenso corazón.",
    "Mamá, mereces todo lo bueno, todo lo bello y toda la felicidad del mundo."
];

let indiceMensaje = 0;

function iniciarCarrusel() {
    const caja = document.getElementById("messageBox");
    caja.textContent = mensajesCarrusel[indiceMensaje];
}

function cambiarMensaje(direccion) {
    indiceMensaje += direccion;

    if (indiceMensaje < 0) {
        indiceMensaje = mensajesCarrusel.length - 1;
    }

    if (indiceMensaje >= mensajesCarrusel.length) {
        indiceMensaje = 0;
    }

    const caja = document.getElementById("messageBox");
    caja.style.opacity = "0";

    setTimeout(() => {
        caja.textContent = mensajesCarrusel[indiceMensaje];
        caja.style.opacity = "1";
    }, 180);
}

function mostrarCarta() {
    const carta = document.getElementById("carta");
    carta.classList.add("show");
    carta.scrollIntoView({ behavior: "smooth" });
    lluviaEspecial();
}

function voltearTarjeta(tarjeta) {
    tarjeta.classList.toggle("flipped");
    crearElementosFlotantes(6);
}

function mostrarBendicion() {
    const resultado = document.getElementById("resultado");
    const indice = Math.floor(Math.random() * bendiciones.length);

    resultado.style.opacity = "0";

    setTimeout(() => {
        resultado.textContent = bendiciones[indice];
        resultado.style.opacity = "1";
    }, 180);

    crearElementosFlotantes(12);
}

function elegirFigura() {
    const figuras = ["❤️", "💖", "🌹", "🌸", "💐", "✨", "💕", "🌷"];
    return figuras[Math.floor(Math.random() * figuras.length)];
}

function crearElementoFlotante() {
    const contenedor = document.getElementById("floating-container");
    const item = document.createElement("div");
    item.classList.add("float-item");
    item.textContent = elegirFigura();

    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize = (Math.random() * 18 + 20) + "px";
    item.style.animationDuration = (Math.random() * 2 + 4) + "s";

    contenedor.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, 6500);
}

function crearElementosFlotantes(cantidad) {
    for (let i = 0; i < cantidad; i++) {
        setTimeout(() => {
            crearElementoFlotante();
        }, i * 120);
    }
}

function lluviaEspecial() {
    crearElementosFlotantes(22);
}

setInterval(() => {
    crearElementoFlotante();
}, 2600);

window.onload = function () {
    iniciarCarrusel();
};
