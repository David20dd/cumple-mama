function mostrarCarta() {
    const carta = document.getElementById("carta");
    carta.classList.add("abierta");
    carta.scrollIntoView({ behavior: "smooth" });

    crearLluviaDeCorazones();
}

function voltearTarjeta(tarjeta) {
    tarjeta.classList.toggle("volteada");
    crearCorazon();
}

function mostrarBendicion() {
    const mensajes = [
        "Mamá, que Dios te bendiga con salud, alegría y muchos años más de vida.",
        "Eres una mujer maravillosa. Gracias por amar con tanta fuerza y ternura.",
        "Que hoy recibas abrazos, sonrisas y todo el cariño que mereces.",
        "Tu amor es un regalo que no se compara con nada en el mundo.",
        "Mamá, gracias por ser refugio, guía, ejemplo y corazón de la familia.",
        "Que este cumpleaños sea tan bello como todo el amor que has entregado.",
        "Hoy celebramos tu vida, tu dulzura y la bendición de tenerte con nosotros."
    ];

    const resultado = document.getElementById("resultado");
    const indice = Math.floor(Math.random() * mensajes.length);

    resultado.textContent = mensajes[indice];
    resultado.style.animation = "none";

    setTimeout(function() {
        resultado.style.animation = "aparecer 0.6s ease";
    }, 10);

    crearLluviaDeCorazones();
}

function crearCorazon() {
    const corazon = document.createElement("div");
    corazon.classList.add("corazon-flotante");
    corazon.textContent = elegirFigura();

    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.fontSize = Math.random() * 18 + 20 + "px";

    document.body.appendChild(corazon);

    setTimeout(function() {
        corazon.remove();
    }, 5000);
}

function crearLluviaDeCorazones() {
    for (let i = 0; i < 18; i++) {
        setTimeout(function() {
            crearCorazon();
        }, i * 120);
    }
}

function elegirFigura() {
    const figuras = ["❤️", "💖", "🌹", "🌸", "💐", "✨", "🌷", "💕"];
    const posicion = Math.floor(Math.random() * figuras.length);
    return figuras[posicion];
}

setInterval(function() {
    crearCorazon();
}, 2500);
