const mensajes = [
  "Mamá, tus hijos te damos gracias por tu amor, tu paciencia y todo lo que haces por nosotros.",
  "Gracias por cada abrazo, cada consejo y cada muestra de cariño que siempre nos regalas.",
  "Para tus hijos, eres una bendición inmensa y una mujer admirable.",
  "Mamá, contigo nuestro hogar siempre ha sido un lugar lleno de amor y paz.",
  "Tu ternura, tu fortaleza y tu corazón hacen más hermosa nuestra vida.",
  "Tus hijos te amamos muchísimo y hoy queremos recordarte lo especial que eres para nosotros.",
  "Gracias por estar siempre presente, cuidarnos y enseñarnos con amor.",
  "Mamá, eres una luz en la vida de tus hijos y una alegría para nuestra familia."
];

const bendiciones = [
  "Que Dios te bendiga con salud, alegría, paz y muchos años más de vida.",
  "Que este cumpleaños esté lleno de amor, sonrisas y momentos inolvidables.",
  "Que tu vida esté llena de bendiciones tan hermosas como tu corazón.",
  "Que nunca te falten motivos para sonreír y sentirte muy amada.",
  "Que recibas todo el amor que has dado a tus hijos durante tantos años.",
  "Que Dios te cuide, te fortalezca y te llene de felicidad cada día."
];

let indiceMensaje = 0;
let velasApagadas = false;

function iniciarPagina() {
  mostrarMensajeActual();

  setInterval(() => {
    crearElementoFlotante();
  }, 2600);
}

function abrirCarta() {
  const carta = document.getElementById("letterSection");
  carta.classList.add("show");
  carta.scrollIntoView({ behavior: "smooth", block: "start" });
  crearElementosFlotantes(20);
}

function lanzarCelebracion() {
  crearElementosFlotantes(30);
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
  crearElementosFlotantes(6);
}

function apagarVelitas() {
  const seccion = document.querySelector(".cake-section");
  const mensaje = document.getElementById("cakeMessage");

  if (velasApagadas) {
    mensaje.textContent = "Las velitas ya están apagadas. El deseo para mamá sigue brillando en el corazón.";
    crearElementosFlotantes(8);
    return;
  }

  velasApagadas = true;

  seccion.classList.add("out");
  mensaje.textContent = "¡Deseo pedido! Que mamá tenga un año lleno de salud, amor y bendiciones.";

  crearHumoVelitas();
  lanzarConfetti(90);
  crearElementosFlotantes(18);
}

function mostrarBendicionFinal() {
  const finalBlessing = document.getElementById("finalBlessing");
  const indice = Math.floor(Math.random() * bendiciones.length);

  finalBlessing.style.opacity = "0";
  finalBlessing.style.transform = "scale(0.96)";

  setTimeout(() => {
    finalBlessing.textContent = bendiciones[indice];
    finalBlessing.style.opacity = "1";
    finalBlessing.style.transform = "scale(1)";
  }, 180);

  crearElementosFlotantes(14);
}

function elegirFigura() {
  const figuras = ["❤️", "💖", "💕", "🌸", "🌹", "💐", "✨", "🎂"];
  const indice = Math.floor(Math.random() * figuras.length);
  return figuras[indice];
}

function crearElementoFlotante() {
  const capa = document.getElementById("floatingLayer");
  const elemento = document.createElement("div");

  elemento.classList.add("float-item");
  elemento.textContent = elegirFigura();
  elemento.style.left = Math.random() * 100 + "vw";
  elemento.style.fontSize = Math.random() * 16 + 20 + "px";
  elemento.style.animationDuration = Math.random() * 2.4 + 4 + "s";

  capa.appendChild(elemento);

  setTimeout(() => {
    elemento.remove();
  }, 7000);
}

function crearElementosFlotantes(cantidad) {
  for (let i = 0; i < cantidad; i++) {
    setTimeout(() => {
      crearElementoFlotante();
    }, i * 85);
  }
}

function lanzarConfetti(cantidad) {
  const capa = document.getElementById("confettiLayer");
  const colores = ["#ff8fab", "#d6336c", "#ffd43b", "#74c0fc", "#ffffff", "#f59f00"];

  for (let i = 0; i < cantidad; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = colores[Math.floor(Math.random() * colores.length)];
    confetti.style.animationDuration = Math.random() * 2.5 + 3 + "s";
    confetti.style.animationDelay = Math.random() * 0.35 + "s";
    confetti.style.width = Math.random() * 7 + 7 + "px";
    confetti.style.height = Math.random() * 10 + 12 + "px";

    capa.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 6500);
  }
}

function crearHumoVelitas() {
  const posiciones = [
    { left: 46, top: 23 },
    { left: 50, top: 20 },
    { left: 54, top: 23 }
  ];

  const cajaPastel = document.querySelector(".cake-box");
  const rect = cajaPastel.getBoundingClientRect();

  posiciones.forEach((posicion, index) => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const humo = document.createElement("div");
        humo.classList.add("smoke-puff");

        humo.style.left = rect.left + rect.width * (posicion.left / 100) + (Math.random() * 26 - 13) + "px";
        humo.style.top = rect.top + rect.height * (posicion.top / 100) + (Math.random() * 18 - 9) + "px";

        document.body.appendChild(humo);

        setTimeout(() => {
          humo.remove();
        }, 2000);
      }, index * 120 + i * 90);
    }
  });
}

window.onload = iniciarPagina;
