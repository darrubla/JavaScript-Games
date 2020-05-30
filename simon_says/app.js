const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const max_level = 15;

class Juego {
  constructor() {
    this.initialize();
    this.generateSequency();
    this.nextLevel();
  }

  initialize() {
    this.chooseColor = this.chooseColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.toogleBtnEmpezar();
    this.level = 1;
    this.colors = {
      //celeste: celeste, se puede escribir de la siguiente manera
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  toogleBtnEmpezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnEmpezar.classList.remove("hide");
    } else {
      btnEmpezar.classList.add("hide");
    }
  }

  generateSequency() {
    //llenar todos los elementos del array con zeros
    this.sequency = new Array(max_level)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.subLevel = 0;
    this.iluminateSequency();
    this.addClickEvents();
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

  transformColor2Num(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
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

  addClickEvents() {
    this.colors.celeste.addEventListener("click", this.chooseColor);
    this.colors.violeta.addEventListener("click", this.chooseColor);
    this.colors.naranja.addEventListener("click", this.chooseColor);
    this.colors.verde.addEventListener("click", this.chooseColor);
  }

  removeClickEvents() {
    this.colors.celeste.removeEventListener("click", this.chooseColor);
    this.colors.violeta.removeEventListener("click", this.chooseColor);
    this.colors.naranja.removeEventListener("click", this.chooseColor);
    this.colors.verde.removeEventListener("click", this.chooseColor);
  }

  chooseColor(ev) {
    const colorName = ev.target.dataset.color;
    const colorNumber = this.transformColor2Num(colorName);
    this.iluminateColor(colorName);
    if (colorNumber === this.sequency[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.level) {
        this.level++;
        this.removeClickEvents();
        if (this.level === max_level + 1) {
          //Campeón!!!
          const arg = {
            text: "Felicitaciones, ganaste el juego!",
            method: "success",
          };
          this.gameOver(arg);
        } else {
          this.generateSequency();
          setTimeout(this.nextLevel, 1500);
        }
      }
    } else {
      //Looooser!!!
      const arg = {
        text: "Perdiste, sigue prácticando",
        method: "error",
      };
      this.gameOver(arg);
    }
  }

  gameOver(arg) {
    swal("Simon Says", arg.text, arg.method).then(() => {
      this.removeClickEvents();
      this.initialize();
    });
  }
}

function startGame() {
  var juego = new Juego();
}
