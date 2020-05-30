const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");

class Juego {
  constructor() {
    this.initialize();
    this.generateSequency();
    this.nextLevel();
  }

  initialize() {
    btnEmpezar.classList.add("hide");
    this.level = 1;
    this.colors = {
      //celeste: celeste, se puede escribir de la siguiente manera
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  generateSequency() {
    //llenar todos los elementos del array con zeros
    this.sequency = new Array(10)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.iluminateSequency();
  }

  transformNum2Color(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }

  iluminateSequency() {
    for (let i = 0; i < this.level; i++) {
      const color = this.transformNum2Color(this.sequency[i]);
      setTimeout(() => this.iluminateColor(color), 1000 * i);
    }
  }

  iluminateColor(color) {
    this.colors[color].classList.add("light");
    setTimeout(() => this.turnOffColor(color), 400);
  }

  turnOffColor(color) {
    this.colors[color].classList.remove("light");
  }
}

function startGame() {
  var juego = new Juego();
}
