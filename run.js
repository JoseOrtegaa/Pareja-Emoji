/* PAREJA DE EMOJI JS */
'use strict';

/*Obtenemos las secciones .card, .back y body */
const body = document.body;
const cards = document.querySelectorAll(".card");
const back = document.querySelector(".back")

/*Se crea un Array con el codigo de emojis para asi poder trabajar y comparar mejor */
const emojis = ["&#128123", "&#128293", "&#128520", "&#128147",
  "&#128163", "&#128165", "&#128374", "&#128584",
  "&#128123", "&#128293", "&#128520", "&#128147",
  "&#128163", "&#128165", "&#128374", "&#128584",
];

let valor = []; // Array valor = Emoji de la carta volteada

/*Array cart_flipped= Con este array almacenamos las dos cartas que se acaban de voltear para asi poder
  desvoltearlas en caso de que no sean emojis iguales*/
let cart_flipped = [];

let aciertos = document.querySelector("#aciertos") //Para llevar el control de Aciertos
let num_aciertos = 0;

let fallos = document.querySelector("#fallos") //Para llevar el control de Fallos
let num_fallos = 0;

let intentos = document.querySelector("#intentos") //Para llevar el contro de los intentos 
let num_intentos = 0;

let i = 0; //Iterador para que solo permita voltear dos cartas

/*Funcion principal para asignar la clase Flipped, Controlar el numero de cartas volteadas, aciertos y fallos */
const reveal = (e) => {
  const currentCard = e.currentTarget;

  /*Mediante este if se almacena la carta volteada en un array y controlamos las cartas que se voltean, para que asi no se le pueda dar click en la misma y se almacenen dos valores iguales */
  if (!currentCard.classList.contains("flipped")) {
    cart_flipped.push(currentCard);
  }

  if (i <= 1) { // if para controlar el numero de cartas volteadas

    /*Mediante este If, verificamos que esten dando click a otra carta y no a 
      la misma para aumentar el numero de aciertos :) */
    if (!currentCard.classList.contains("flipped")) {
      currentCard.classList.add("flipped");
      valor.push(currentCard.querySelector(".back > p").textContent);
      i++;
    }
  }

  /*Si valor.length es igual a 2 quiere decir que ya han volteado dos cartas por lo tanto hay que evaluar las condiciones */
  if (valor.length === 2) {

    /*la funcion Resultado devolvera un boleanoo, True= Acierto / False= Fallo */
    if (resultado()) {

      num_aciertos++;
      aciertos.textContent = `${num_aciertos}`;

      num_intentos++;
      intentos.textContent = `${num_intentos}`

      i = 0;
    } else {

      num_fallos++;
      fallos.textContent = `${num_fallos}`;

      num_intentos++;
      intentos.textContent = `${num_intentos}`;

      /*Con este For-of recorremos las dos cartas volteadas  en busca de la clase Flipped para removerla */
      for (const car of cart_flipped) {
        setTimeout(() => {
          car.classList.remove("flipped");
        }, 700);
      }
      //Con este for-of y su Timeout controlamos para que no puedan voltear mientras las mismas estan volviendo a su posicion inical
      for (const car of cart_flipped) {
        setTimeout(() => {
          i = 0;
        }, 900);
      }
    }
    /*Reiniciamos valores de las variables para poder volver a evaluar */
    valor = [];
    cart_flipped = [];
  }
}

/*Obtenemos True si la persona a acertado y obtenemos False en caso contrario */
const resultado = () => {
  if (valor[0] === valor[1]) {
    return true;
  } else {
    return false;
  }
}

/*Funcion para asignar emoji a la parte Back de la carta */
const asigEmoji = (num) => {
  if (num = emojis.valor) {
    return emojis.name
  }
}

/* Obetenemos el div .back*/
const dBack = document.querySelectorAll(".back")

/*Iterador para recorrer posiciones del Array */
let it = 0;

/*Con este emoji.sort se desorneda el array de 16 elementos para que toque al azar */
emojis.sort(function () {
  return Math.random() - 0.5
})

/*For para asignar los emojis a la parte .back de las cartas */
for (const ps of dBack) {
  ps.innerHTML = `<p>${emojis[it]}</p>`;
  it++;
}

/* Funcion para agregar click al div*/
for (const card of cards) {
  card.addEventListener("click", reveal);
}