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

function iniciarPagina() {
  mostrarMensajeActual();

  setInterval(() => {
    crearElementoFlotante();
  }, 2400);
}

function abrirCarta() {
  const carta = document.getElementById("letterSection");
  carta.classList.add("show");
  carta.scrollIntoView({ behavior: "smooth" });
  crearElementosFlotantes(20);
}

function lanzarCelebracion() {
  crearElementosFlotantes(30);
  lanzarConfetti(70);
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

  seccion.classList.add("out");
  mensaje.textContent = "¡Deseo pedido! Que mamá tenga un año lleno de salud, amor y bendiciones.";
  lanzarConfetti(55);
  crearElementosFlotantes(14);
}

function mostrarBendicionFinal() {
  const finalBlessing = document.getElementById("finalBlessing");
  const indice = Math.floor(Math.random() * bendiciones.length);

  finalBlessing.style.opacity = "0";

  setTimeout(() => {
    finalBlessing.textContent = bendiciones[indice];
    finalBlessing.style.opacity = "1";
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
  elemento.style.fontSize = Math.random() * 18 + 20 + "px";
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
    confetti.style.animationDelay = Math.random() * 0.3 + "s";

    capa.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 6500);
  }
}

window.onload = iniciarPagina;
