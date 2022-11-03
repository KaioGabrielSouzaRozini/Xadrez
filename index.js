import { testaImparPar } from "./main.js";
var jogadasReiPreto = 0;
var jogadasReiBranco = 0;

export class Peca {
  constructor(nome, id, image, cor) {
    this.nome = nome;
    this.id = id;
    this.image = image;
    this.cor = cor;
  }
  ganhou(jogador) {
    var pecas = document.querySelectorAll(".item");
    for (let i = 0; i < pecas.length; i++) {
      pecas[i].draggable = false;
    }
    setTimeout((e) => {
      alert(`${jogador} ganhou`);
    });
    const namePlayer1 = document.getElementById("player1").value;
    const namePlayer2 = document.getElementById("player2").value;
    if (jogador == "branco") {
      vez.innerText = `${namePlayer1} ganhou!`;
    } else {
      vez.innerText = `${namePlayer2} ganhou!`;
    }
  }
  criaPeca() {
    var img = document.createElement("img");
    img.setAttribute("draggable", true);
    img.setAttribute("class", `item ${this.cor}`);
    img.src = this.image;
    img.id = this.id + "image";
    img.name = this.nome;
    var index = document.getElementById(this.id);
    index.appendChild(img);

    var itens = document.querySelectorAll(".item");
    var quadrados = document.querySelectorAll(".quadrado");

    itens.forEach((item) => {
      item.addEventListener("dragstart", this.moving);
    });
    quadrados.forEach((quadrado) => {
      quadrado.addEventListener("dragover", this.dragOver);
      quadrado.addEventListener("drop", (e) => this.dropEvent(e, quadrado));
      quadrado.addEventListener("dragleave", this.dragLeave);
    });
  }

  moving(e) {
    testaImparPar();
    e.dataTransfer.setData("text1", e.target.name);
    e.dataTransfer.setData("text2", e.target.id);

    setTimeout((e) => {
      document.getElementById(`${this.id}`).remove();
    });
  }

  dragOver(e) {
    e.preventDefault();
  }
  dropEvent(e, quadrado) {
    e.preventDefault();
    var newNome = e.dataTransfer.getData("text1");
    var getId = e.dataTransfer.getData("text2");
    var newId = this.id + "image";
    var nomePeca = this.nome;
    var jogadaPossivel1;

    if (quadrado.children.length > 0) {
      if (quadrado.children[0].className.includes("preto")) {
        if (this.cor == "preto") {
          jogadaPossivel1 = false;
        } else {
          jogadaPossivel1 = true;
          quadrado.removeChild(quadrado.firstChild);
        }
      } else {
        if (this.cor == "branco") {
          jogadaPossivel1 = false;
        } else {
          jogadaPossivel1 = true;
          quadrado.removeChild(quadrado.firstChild);
        }
      }
    } else {
      jogadaPossivel1 = true;
    }

    if (newNome == nomePeca && getId == newId && jogadaPossivel1) {
      var img = document.createElement("img");
      img.setAttribute("draggable", true);
      img.setAttribute("class", `item ${this.cor}`);
      img.src = this.image;
      img.id = this.id + "image";
      img.name = this.nome;

      img.addEventListener("dragstart", this.moving);

      quadrado.appendChild(img);
    }
  }

  dragLeave(e) {
    e.preventDefault();
  }
}

export class Peao extends Peca {
  constructor(nome, id, image, cor) {
    super(nome, id, image, cor);
    this.primeiraJogada = true;
  }
  criaPeca() {
    var img = document.createElement("img");
    img.setAttribute("draggable", true);
    img.setAttribute("class", `item ${this.cor}`);
    img.src = this.image;
    img.id = this.id + "image";
    img.name = this.nome;
    var index = document.getElementById(this.id);
    index.appendChild(img);

    var itens = document.querySelectorAll(".item");
    var quadrados = document.querySelectorAll(".quadrado");

    itens.forEach((item) => {
      item.addEventListener("dragstart", this.moving);
    });
    quadrados.forEach((quadrado) => {
      quadrado.addEventListener("dragover", this.dragOver);
      quadrado.addEventListener("drop", (e) => this.dropEvent(e, quadrado));
      quadrado.addEventListener("dragleave", this.dragLeave);
    });
  }
  moving(e) {
    e.dataTransfer.setData("text1", e.target.name);
    e.dataTransfer.setData("text2", e.target.id);
    e.dataTransfer.setData("text3", e.path[1].id);

    setTimeout((e) => {
      if (this.id == null) {
      } else {
        document.getElementById(`${this.id}`).remove();
      }
    });
  }

  dropEvent(e, quadrado) {
    e.preventDefault();

    var newNome = e.dataTransfer.getData("text1");
    var getId = e.dataTransfer.getData("text2");
    var newId = this.id + "image";
    var nomePeca = this.nome;
    var divInicial = e.dataTransfer.getData("text3");
    var divInicialY = divInicial.slice(3, 4);
    var divInicialX = divInicial.slice(1, 2);

    if (newNome == nomePeca && getId == newId) {
      var divFinal = quadrado.id;
      var divFinalY = divFinal.slice(3, 4);
      var divFinalX = divFinal.slice(1, 2);
      var y = divFinalX - divInicialX;
      var x = divFinalY - divInicialY;
      var jogadaPossivel;
      var jogadaPossivel1;
      var jogadaPossivel2 = true;
      var mata;
      var contador = 0;

      var diferencaY = divInicialX - divFinalX;
      var diferencaX = divInicialY - divFinalY;
      divInicialY = parseInt(divInicialY);
      divInicialX = parseInt(divInicialX);

      if (this.cor == "preto") {
        if (y < 0 && y == -1) {
          jogadaPossivel = true;
          if (
            (x == 1 && quadrado.children.length > 0) ||
            (x == -1 && quadrado.children.length > 0)
          ) {
            mata = true;
          } else {
            mata = false;
          }
        } else if (y < 0 && y == -2 && this.primeiraJogada) {
          jogadaPossivel = true;
          mata = false;
        } else {
          jogadaPossivel = false;
          mata = false;
        }
      } else {
        if (y > 0 && y == 1) {
          jogadaPossivel = true;
          if (
            (x == 1 && quadrado.children.length > 0) ||
            (x == -1 && quadrado.children.length > 0)
          ) {
            mata = true;
          } else {
            mata = false;
          }
        } else if (y > 0 && y == 2 && this.primeiraJogada) {
          jogadaPossivel = true;
          mata = false;
        } else {
          jogadaPossivel = false;
          mata = false;
        }
      }
      if (quadrado.children.length > 0) {
        if (quadrado.children[0].className.includes("preto")) {
          if (this.cor == "preto") {
            jogadaPossivel1 = false;
          } else {
            if (mata) {
              jogadaPossivel1 = true;
            } else {
              jogadaPossivel1 = false;
            }
          }
        } else if (quadrado.children[0].className.includes("branco")) {
          if (this.cor == "branco") {
            jogadaPossivel1 = false;
          } else {
            if (mata) {
              jogadaPossivel1 = true;
            } else {
              jogadaPossivel1 = false;
            }
          }
        }
      } else {
        jogadaPossivel1 = true;
      }

      if (diferencaY > 0) {
        for (var i = 1; i < diferencaY; i++) {
          var pecasEntre = document.getElementById(
            `i${divInicialX - i}e${divInicialY}`
          );
          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      }

      if (
        divInicialY == divFinalY &&
        jogadaPossivel &&
        jogadaPossivel1 &&
        jogadaPossivel2
      ) {
        if (this.cor == "preto") {
          if (quadrado.id.slice(0, 2) == "i0") {
            do {
              var escolha = prompt(`escolha a peça que deseja:
            1) Rainha
            2) Torre
            3) Cavalo
            4) Bispo`);
              switch (escolha) {
                case "1":
                  var novaRainha = new Rainha(
                    "rainhaPreta",
                    quadrado.id,
                    "/imagens/rainha-preta.png",
                    "preto"
                  );
                  novaRainha.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "2":
                  var novaTorre = new Torre(
                    "torrePreta",
                    quadrado.id,
                    "/imagens/torre-preta.png",
                    "preto"
                  );
                  novaTorre.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "3":
                  var novoCavalo = new Cavalo(
                    "cavaloPreto",
                    quadrado.id,
                    "/imagens/cavalo-preto.png",
                    "preto"
                  );
                  novoCavalo.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "4":
                  var novoBispo = new Bispo(
                    "bispoPreto",
                    quadrado.id,
                    "/imagens/bispo-preto.png",
                    "preto"
                  );
                  novoBispo.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                default:
                  break;
              }
            } while (
              escolha != "1" &&
              escolha != "2" &&
              escolha != "3" &&
              escolha != "4"
            );
            {
            }
          }
        } else if (this.cor == "branco") {
          if (quadrado.id.slice(0, 2) == "i7") {
            do {
              var escolha = prompt(`escolha a peça que deseja:
            1) Rainha
            2) Torre
            3) Cavalo
            4) Bispo`);
              switch (escolha) {
                case "1":
                  var novaRainha = new Rainha(
                    "rainhaBranca",
                    quadrado.id,
                    "/imagens/rainha-branca.png",
                    "branco"
                  );
                  novaRainha.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "2":
                  var novaTorre = new Torre(
                    "torreBranca",
                    quadrado.id,
                    "/imagens/torre-branca.png",
                    "branco"
                  );
                  novaTorre.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "3":
                  var novoCavalo = new Cavalo(
                    "cavaloBranco",
                    quadrado.id,
                    "/imagens/cavalo-branco.png",
                    "branco"
                  );
                  novoCavalo.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "4":
                  var novoBispo = new Bispo(
                    "bispoBranco",
                    quadrado.id,
                    "/imagens/bispo-branco.png",
                    "branco"
                  );
                  novoBispo.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                default:
                  break;
              }
            } while (
              escolha != "1" &&
              escolha != "2" &&
              escolha != "3" &&
              escolha != "4"
            );
            {
            }
          }
        }
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        this.primeiraJogada = false;
        testaImparPar();
      } else if (mata && jogadaPossivel1) {
        if (this.cor == "preto") {
          if (quadrado.id.slice(0, 2) == "i0") {
            do {
              var escolha = prompt(`escolha a peça que deseja:
          1) Rainha
          2) Torre
          3) Cavalo
          4) Bispo`);
              switch (escolha) {
                case "1":
                  var novaRainha = new Rainha(
                    "rainhaPreta",
                    quadrado.id,
                    "/imagens/rainha-preta.png",
                    "preto"
                  );
                  novaRainha.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "2":
                  var novaTorre = new Torre(
                    "torrePreta",
                    quadrado.id,
                    "/imagens/torre-preta.png",
                    "preto"
                  );
                  novaTorre.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "3":
                  var novoCavalo = new Cavalo(
                    "cavaloPreto",
                    quadrado.id,
                    "/imagens/cavalo-preto.png",
                    "preto"
                  );
                  novoCavalo.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "4":
                  var novoBispo = new Bispo(
                    "bispoPreto",
                    quadrado.id,
                    "/imagens/bispo-preto.png",
                    "preto"
                  );
                  novoBispo.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                default:
                  break;
              }
            } while (
              escolha != "1" &&
              escolha != "2" &&
              escolha != "3" &&
              escolha != "4"
            );
            {
            }
          }
        } else if (this.cor == "branco") {
          if (quadrado.id.slice(0, 2) == "i7") {
            do {
              var escolha = prompt(`escolha a peça que deseja:
          1) Rainha
          2) Torre
          3) Cavalo
          4) Bispo`);
              switch (escolha) {
                case "1":
                  var novaRainha = new Rainha(
                    "rainhaBranca",
                    quadrado.id,
                    "/imagens/rainha-branca.png",
                    "branco"
                  );
                  novaRainha.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "2":
                  var novaTorre = new Torre(
                    "torreBranca",
                    quadrado.id,
                    "/imagens/torre-branca.png",
                    "branco"
                  );
                  novaTorre.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "3":
                  var novoCavalo = new Cavalo(
                    "cavaloBranco",
                    quadrado.id,
                    "/imagens/cavalo-branco.png",
                    "branco"
                  );
                  novoCavalo.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                case "4":
                  var novoBispo = new Bispo(
                    "bispoBranco",
                    quadrado.id,
                    "/imagens/bispo-branco.png",
                    "branco"
                  );
                  novoBispo.criaPeca();
                  setTimeout((e) => {
                    quadrado.children[1].remove();
                  });
                  break;
                default:
                  break;
              }
            } while (
              escolha != "1" &&
              escolha != "2" &&
              escolha != "3" &&
              escolha != "4"
            );
            {
            }
          }
        }
        if (quadrado.children.length > 0) {
          if (quadrado.children[0].className.includes("preto")) {
            if (this.cor == "preto") {
            } else {
              var pecasMortas = document.getElementById("pecas-brancas-mortas");

              quadrado.firstChild.draggable = false;
              if (quadrado.firstChild.name.includes("rei")) {
                var branco = "branco";
                this.ganhou(branco);
                console.log(this);
              }
              pecasMortas.appendChild(quadrado.firstChild);
            }
          } else {
            if (this.cor == "branco") {
            } else {
              var pecasMortas = document.getElementById("pecas-pretas-mortas");
              if (quadrado.firstChild.name.includes("rei")) {
                var preto = "preto";
                this.ganhou(preto);
              }
              quadrado.firstChild.draggable = false;
              pecasMortas.appendChild(quadrado.firstChild);
            }
          }
        }
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;
        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        this.primeiraJogada = false;
        testaImparPar();
      } else {
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);
        var quadradoAntigo = document.getElementById(`${divInicial}`);
        quadradoAntigo.appendChild(img);
      }
    }
  }
}

export class Torre extends Peca {
  constructor(nome, id, image, cor) {
    super(nome, id, image, cor);
    this.jogadaPossivel5 = true;
  }
  criaPeca() {
    var img = document.createElement("img");
    img.setAttribute("draggable", true);
    img.setAttribute("class", `item ${this.cor}`);
    img.src = this.image;
    img.id = this.id + "image";
    img.name = this.nome;
    var index = document.getElementById(this.id);
    index.appendChild(img);

    var itens = document.querySelectorAll(".item");
    var quadrados = document.querySelectorAll(".quadrado");

    itens.forEach((item) => {
      item.addEventListener("dragstart", this.moving);
    });
    quadrados.forEach((quadrado) => {
      quadrado.addEventListener("dragover", this.dragOver);
      quadrado.addEventListener("drop", (e) => this.dropEvent(e, quadrado));
      quadrado.addEventListener("dragleave", this.dragLeave);
    });
  }
  moving(e) {
    e.dataTransfer.setData("text1", e.target.name);
    e.dataTransfer.setData("text2", e.target.id);
    e.dataTransfer.setData("text3", e.path[1].id);

    setTimeout((e) => {
      if (this.id == null) {
      } else {
        document.getElementById(`${this.id}`).remove();
      }
    });
  }

  dropEvent(e, quadrado) {
    e.preventDefault();

    var newNome = e.dataTransfer.getData("text1");
    var getId = e.dataTransfer.getData("text2");
    var newId = this.id + "image";
    var nomePeca = this.nome;
    var divInicial = e.dataTransfer.getData("text3");
    var divInicialY = divInicial.slice(3, 4);
    var divInicialX = divInicial.slice(1, 2);
    var jogadaPossivel1;
    var jogadaPossivel2;
    var jogadaPossivel3;
    var jogadaPossivel4;
    var contador = 0;
    var contador1 = 0;
    var divFinal = quadrado.id;
    var divFinalY = divFinal.slice(3, 4);
    var divFinalX = divFinal.slice(1, 2);
    var diferencaY = divInicialX - divFinalX;
    var diferencaX = divInicialY - divFinalY;
    divInicialY = parseInt(divInicialY);
    divInicialX = parseInt(divInicialX);

    if (newNome == nomePeca && getId == newId) {
      if (quadrado.children.length > 0) {
        if (quadrado.children[0].className.includes("preto")) {
          if (this.cor == "preto") {
            if (quadrado.children[0].name.includes("rei")) {
              for (var i = 1; i < -diferencaX; i++) {
                var pecasEntre = document.getElementById(
                  `i${divInicialX}e${divInicialY + i}`
                );

                if (pecasEntre.children.length > 0) {
                  contador += 1;
                } else {
                  contador += 0;
                }
              }

              if (contador != 0) {
                jogadaPossivel2 = false;
              } else {
                jogadaPossivel4 = true;
                jogadaPossivel2 = true;
              }
            } else {
              jogadaPossivel1 = true;
            }
          } else {
            jogadaPossivel1 = true;
          }
        } else {
          if (this.cor == "branco") {
            if (quadrado.children[0].name.includes("rei")) {
              for (var i = 1; i < -diferencaX; i++) {
                var pecasEntre = document.getElementById(
                  `i${divInicialX}e${divInicialY + i}`
                );

                if (pecasEntre.children.length > 0) {
                  contador += 1;
                } else {
                  contador += 0;
                }
              }

              if (contador != 0) {
                jogadaPossivel2 = false;
              } else {
                jogadaPossivel4 = true;
                jogadaPossivel2 = true;
              }
            } else {
              jogadaPossivel2 = false;
              jogadaPossivel4 = false;
            }
          } else {
            jogadaPossivel1 = true;
          }
        }
      } else {
        jogadaPossivel1 = true;
      }

      if (diferencaY > 0) {
        for (var i = 1; i < diferencaY; i++) {
          var pecasEntre = document.getElementById(
            `i${divInicialX - i}e${divInicialY}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      } else if (diferencaY < 0) {
        for (var i = -1; i > diferencaY; i -= 1) {
          var pecasEntre = document.getElementById(
            `i${divInicialX - i}e${divInicialY}`
          );
          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      } else {
        jogadaPossivel2 = true;
      }

      if (diferencaX > 0) {
        for (var i = 1; i < diferencaX; i++) {
          var pecasEntre = document.getElementById(
            `i${divInicialX}e${divInicialY - i}`
          );

          if (pecasEntre.children.length > 0) {
            contador1 += 1;
          } else {
            contador1 += 0;
          }
        }

        if (contador1 != 0) {
          jogadaPossivel3 = false;
        } else {
          jogadaPossivel3 = true;
        }
      } else if (diferencaX < 0) {
        for (var i = -1; i > diferencaX; i -= 1) {
          var pecasEntre = document.getElementById(
            `i${divInicialX}e${divInicialY - i}`
          );
          if (pecasEntre.children.length > 0) {
            contador1 += 1;
          } else {
            contador1 += 0;
          }
        }
        if (contador1 != 0) {
          jogadaPossivel3 = false;
        } else {
          jogadaPossivel3 = true;
        }
      } else {
        jogadaPossivel3 = true;
      }

      if (divInicialY == divFinalY && jogadaPossivel1 && jogadaPossivel2) {
        if (quadrado.children.length > 0) {
          if (quadrado.children[0].className.includes("preto")) {
            if (this.cor == "preto") {
              if (quadrado.children[0].name.includes("rei")) {
                console.log("eae");
                jogadaPossivel4 = true;
              }
            } else {
              var pecasMortas = document.getElementById("pecas-brancas-mortas");

              quadrado.firstChild.draggable = false;
              if (quadrado.firstChild.name.includes("rei")) {
                var branco = "branco";
                this.ganhou(branco);
                console.log(this);
              }

              pecasMortas.appendChild(quadrado.firstChild);
            }
          } else {
            if (this.cor == "branco") {
              if (quadrado.firstChild.name.includes("rei")) {
                console.log("eae");
                jogadaPossivel4 = true;
              }
            } else {
              var pecasMortas = document.getElementById("pecas-pretas-mortas");
              if (quadrado.firstChild.name.includes("rei")) {
                var preto = "preto";
                this.ganhou(preto);
              }
              quadrado.firstChild.draggable = false;
              pecasMortas.appendChild(quadrado.firstChild);
            }
          }
        }
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        this.jogadaPossivel5 = false;
        testaImparPar();
      } else if (
        divInicialX == divFinalX &&
        jogadaPossivel1 &&
        jogadaPossivel3
      ) {
        if (quadrado.children.length > 0) {
          if (quadrado.children[0].className.includes("preto")) {
            if (this.cor == "preto") {
            } else {
              var pecasMortas = document.getElementById("pecas-brancas-mortas");

              quadrado.firstChild.draggable = false;
              if (quadrado.firstChild.name.includes("rei")) {
                var branco = "branco";
                this.ganhou(branco);
              }
              pecasMortas.appendChild(quadrado.firstChild);
            }
          } else {
            if (this.cor == "branco") {
            } else {
              var pecasMortas = document.getElementById("pecas-pretas-mortas");
              if (quadrado.firstChild.name.includes("rei")) {
                var preto = "preto";
                this.ganhou(preto);
              }
              quadrado.firstChild.draggable = false;
              pecasMortas.appendChild(quadrado.firstChild);
            }
          }
        }
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        this.jogadaPossivel5 = false;
        testaImparPar();
      } else if (
        (this.cor == "preto" &&
          divInicialX == divFinalX &&
          jogadaPossivel4 &&
          jogadaPossivel2 &&
          jogadaPossivel3 &&
          this.jogadaPossivel5 &&
          jogadasReiPreto == 0) ||
        (this.cor == "preto" &&
          divInicialY == divFinalY &&
          jogadaPossivel4 &&
          jogadaPossivel2 &&
          jogadaPossivel3 &&
          this.jogadaPossivel5 &&
          jogadasReiPreto == 0)
      ) {
        testaImparPar();
        var img = document.createElement("img");
        img.setAttribute("draggable", false);
        img.setAttribute("class", `item preto`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        var quadradoAntigo = document.getElementById(`${divInicial}`);
        quadradoAntigo.appendChild(quadrado.firstChild);
        this.jogadaPossivel5 = false;
        jogadasReiPreto += 1;
      } else if (
        (this.cor == "branco" &&
          divInicialX == divFinalX &&
          jogadaPossivel4 &&
          jogadaPossivel2 &&
          jogadaPossivel3 &&
          this.jogadaPossivel5 &&
          jogadasReiBranco == 0) ||
        (this.cor == "branco" &&
          divInicialY == divFinalY &&
          jogadaPossivel4 &&
          jogadaPossivel2 &&
          jogadaPossivel3 &&
          this.jogadaPossivel5 &&
          jogadasReiBranco == 0)
      ) {
        testaImparPar();
        var img = document.createElement("img");
        img.setAttribute("draggable", false);
        img.setAttribute("class", `item branco`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        var quadradoAntigo = document.getElementById(`${divInicial}`);
        quadradoAntigo.appendChild(quadrado.firstChild);
        this.jogadaPossivel5 = false;

        jogadasReiBranco += 1;
      } else {
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);
        var quadradoAntigo = document.getElementById(`${divInicial}`);
        quadradoAntigo.appendChild(img);
      }
    }
  }
}
export class Bispo extends Peca {
  constructor(nome, id, image, cor) {
    super(nome, id, image, cor);
  }
  criaPeca() {
    var img = document.createElement("img");
    img.setAttribute("draggable", true);
    img.setAttribute("class", `item ${this.cor}`);
    img.src = this.image;
    img.id = this.id + "image";
    img.name = this.nome;
    var index = document.getElementById(this.id);
    index.appendChild(img);

    var itens = document.querySelectorAll(".item");
    var quadrados = document.querySelectorAll(".quadrado");

    itens.forEach((item) => {
      item.addEventListener("dragstart", this.moving);
    });
    quadrados.forEach((quadrado) => {
      quadrado.addEventListener("dragover", this.dragOver);
      quadrado.addEventListener("drop", (e) => this.dropEvent(e, quadrado));
      quadrado.addEventListener("dragleave", this.dragLeave);
    });
  }
  moving(e) {
    e.dataTransfer.setData("text1", e.target.name);
    e.dataTransfer.setData("text2", e.target.id);
    e.dataTransfer.setData("text3", e.path[1].id);

    setTimeout((e) => {
      if (this.id == null) {
      } else {
        document.getElementById(`${this.id}`).remove();
      }
    });
  }

  dropEvent(e, quadrado) {
    e.preventDefault();

    var newNome = e.dataTransfer.getData("text1");
    var getId = e.dataTransfer.getData("text2");
    var newId = this.id + "image";
    var nomePeca = this.nome;
    var divInicial = e.dataTransfer.getData("text3");
    var divInicialY = divInicial.slice(3, 4);
    var divInicialX = divInicial.slice(1, 2);
    var jogadaPossivel1;
    var jogadaPossivel2 = true;
    if (newNome == nomePeca && getId == newId) {
      var divFinal = quadrado.id;
      var divFinalY = divFinal.slice(3, 4);
      var divFinalX = divFinal.slice(1, 2);

      divInicialY = parseInt(divInicialY);
      divInicialX = parseInt(divInicialX);

      var diferencaY = divInicialX - divFinalX;
      var diferencaX = divInicialY - divFinalY;

      var contador = 0;

      var divFinalY1 = parseInt(divFinalY) + 1;
      var divFinalX1 = parseInt(divFinalX) + 1;
      var divFinalY2 = parseInt(divFinalY) + 2;
      var divFinalX2 = parseInt(divFinalX) + 2;
      var divFinalY3 = parseInt(divFinalY) + 3;
      var divFinalX3 = parseInt(divFinalX) + 3;
      var divFinalY4 = parseInt(divFinalY) + 4;
      var divFinalX4 = parseInt(divFinalX) + 4;
      var divFinalY5 = parseInt(divFinalY) + 5;
      var divFinalX5 = parseInt(divFinalX) + 5;
      var divFinalY6 = parseInt(divFinalY) + 6;
      var divFinalX6 = parseInt(divFinalX) + 6;
      var divFinalY7 = parseInt(divFinalY) + 7;
      var divFinalX7 = parseInt(divFinalX) + 7;

      var divFinalY01 = parseInt(divFinalY) - 1;
      var divFinalX01 = parseInt(divFinalX) - 1;
      var divFinalY02 = parseInt(divFinalY) - 2;
      var divFinalX02 = parseInt(divFinalX) - 2;
      var divFinalY03 = parseInt(divFinalY) - 3;
      var divFinalX03 = parseInt(divFinalX) - 3;
      var divFinalY04 = parseInt(divFinalY) - 4;
      var divFinalX04 = parseInt(divFinalX) - 4;
      var divFinalY05 = parseInt(divFinalY) - 5;
      var divFinalX05 = parseInt(divFinalX) - 5;
      var divFinalY06 = parseInt(divFinalY) - 6;
      var divFinalX06 = parseInt(divFinalX) - 6;
      var divFinalY07 = parseInt(divFinalY) - 7;
      var divFinalX07 = parseInt(divFinalX) - 7;

      if (quadrado.children.length > 0) {
        if (quadrado.children[0].className.includes("preto")) {
          if (this.cor == "preto") {
            jogadaPossivel1 = false;
          } else {
            jogadaPossivel1 = true;
          }
        } else {
          if (this.cor == "branco") {
            jogadaPossivel1 = false;
          } else {
            jogadaPossivel1 = true;
          }
        }
      } else {
        jogadaPossivel1 = true;
      }

      if (diferencaY == diferencaX && diferencaX > 0) {
        for (var i = 1; i < diferencaY; i++) {
          var pecasEntre = document.getElementById(
            `i${divInicialX - i}e${divInicialY - i}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      } else if (diferencaY == diferencaX && diferencaX < 0) {
        for (var i = -1; i > diferencaY; i -= 1) {
          var pecasEntre = document.getElementById(
            `i${divInicialX - i}e${divInicialY - i}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      }
      if (diferencaY == -diferencaX && diferencaY > 0) {
        for (var i = 1; i < diferencaY; i++) {
          var pecasEntre = document.getElementById(
            `i${divInicialX - i}e${divInicialY + i}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      } else if (diferencaY == -diferencaX && diferencaX > 0) {
        for (var i = 1; i < diferencaX; i++) {
          var pecasEntre = document.getElementById(
            `i${divInicialX + i}e${divInicialY - i}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      }

      if (
        (divInicialY == divFinalY1 &&
          divInicialX == divFinalX1 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY2 &&
          divInicialX == divFinalX2 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY3 &&
          divInicialX == divFinalX3 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY4 &&
          divInicialX == divFinalX4 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY5 &&
          divInicialX == divFinalX5 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY6 &&
          divInicialX == divFinalX6 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY7 &&
          divInicialX == divFinalX7 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY01 &&
          divInicialX == divFinalX01 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY02 &&
          divInicialX == divFinalX02 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY03 &&
          divInicialX == divFinalX03 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY04 &&
          divInicialX == divFinalX04 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY05 &&
          divInicialX == divFinalX05 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY06 &&
          divInicialX == divFinalX06 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY07 &&
          divInicialX == divFinalX07 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY1 &&
          divInicialX == divFinalX01 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY2 &&
          divInicialX == divFinalX02 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY3 &&
          divInicialX == divFinalX03 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY4 &&
          divInicialX == divFinalX04 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY5 &&
          divInicialX == divFinalX05 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY6 &&
          divInicialX == divFinalX06 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY7 &&
          divInicialX == divFinalX07 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY01 &&
          divInicialX == divFinalX1 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY02 &&
          divInicialX == divFinalX2 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY03 &&
          divInicialX == divFinalX3 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY04 &&
          divInicialX == divFinalX4 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY05 &&
          divInicialX == divFinalX5 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY06 &&
          divInicialX == divFinalX6 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY07 &&
          divInicialX == divFinalX7 &&
          jogadaPossivel1 &&
          jogadaPossivel2)
      ) {
        if (quadrado.children.length > 0) {
          if (quadrado.children[0].className.includes("preto")) {
            if (this.cor == "preto") {
            } else {
              var pecasMortas = document.getElementById("pecas-brancas-mortas");

              quadrado.firstChild.draggable = false;
              if (quadrado.firstChild.name.includes("rei")) {
                var branco = "branco";
                this.ganhou(branco);
                console.log(this);
              }
              pecasMortas.appendChild(quadrado.firstChild);
            }
          } else {
            if (this.cor == "branco") {
            } else {
              var pecasMortas = document.getElementById("pecas-pretas-mortas");
              if (quadrado.firstChild.name.includes("rei")) {
                var preto = "preto";
                this.ganhou(preto);
              }
              quadrado.firstChild.draggable = false;
              pecasMortas.appendChild(quadrado.firstChild);
            }
          }
        }
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        testaImparPar();
      } else {
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);
        var quadradoAntigo = document.getElementById(`${divInicial}`);
        quadradoAntigo.appendChild(img);
      }
    }
  }
}
export class Cavalo extends Peca {
  constructor(nome, id, image, cor) {
    super(nome, id, image, cor);
  }
  criaPeca() {
    var img = document.createElement("img");
    img.setAttribute("draggable", true);
    img.setAttribute("class", `item ${this.cor}`);
    img.src = this.image;
    img.id = this.id + "image";
    img.name = this.nome;
    var index = document.getElementById(this.id);
    index.appendChild(img);

    var itens = document.querySelectorAll(".item");
    var quadrados = document.querySelectorAll(".quadrado");

    itens.forEach((item) => {
      item.addEventListener("dragstart", this.moving);
    });
    quadrados.forEach((quadrado) => {
      quadrado.addEventListener("dragover", this.dragOver);
      quadrado.addEventListener("drop", (e) => this.dropEvent(e, quadrado));
      quadrado.addEventListener("dragleave", this.dragLeave);
    });
  }
  moving(e) {
    e.dataTransfer.setData("text1", e.target.name);
    e.dataTransfer.setData("text2", e.target.id);
    e.dataTransfer.setData("text3", e.path[1].id);

    setTimeout((e) => {
      if (this.id == null) {
      } else {
        document.getElementById(`${this.id}`).remove();
      }
    });
  }

  dropEvent(e, quadrado) {
    e.preventDefault();

    var newNome = e.dataTransfer.getData("text1");
    var getId = e.dataTransfer.getData("text2");
    var newId = this.id + "image";
    var nomePeca = this.nome;
    var divInicial = e.dataTransfer.getData("text3");
    var divInicialY = divInicial.slice(3, 4);
    var divInicialX = divInicial.slice(1, 2);
    var jogadaPossivel1 = true;
    if (newNome == nomePeca && getId == newId) {
      var divFinal = quadrado.id;
      var divFinalY = divFinal.slice(3, 4);
      var divFinalX = divFinal.slice(1, 2);
      var divFinalY1 = parseInt(divFinalY) + 1;
      var divFinalX1 = parseInt(divFinalX) + 2;

      var divFinalY2 = parseInt(divFinalY) + 1;
      var divFinalX2 = parseInt(divFinalX) - 2;

      var divFinalY3 = parseInt(divFinalY) + 2;
      var divFinalX3 = parseInt(divFinalX) + 1;

      var divFinalY4 = parseInt(divFinalY) + 1;
      var divFinalX4 = parseInt(divFinalX) - 2;

      var divFinalY5 = parseInt(divFinalY) - 1;
      var divFinalX5 = parseInt(divFinalX) + 2;

      var divFinalY6 = parseInt(divFinalY) - 1;
      var divFinalX6 = parseInt(divFinalX) - 2;

      var divFinalY7 = parseInt(divFinalY) - 2;
      var divFinalX7 = parseInt(divFinalX) + 1;

      var divFinalY8 = parseInt(divFinalY) - 2;
      var divFinalX8 = parseInt(divFinalX) - 1;

      var divFinalY9 = parseInt(divFinalY) + 2;
      var divFinalX9 = parseInt(divFinalX) - 1;

      if (quadrado.children.length > 0) {
        if (quadrado.children[0].className.includes("preto")) {
          if (this.cor == "preto") {
            jogadaPossivel1 = false;
          } else {
            jogadaPossivel1 = true;
          }
        } else {
          if (this.cor == "branco") {
            jogadaPossivel1 = false;
          } else {
            jogadaPossivel1 = true;
          }
        }
      } else {
        jogadaPossivel1 = true;
      }

      if (
        (divInicialY == divFinalY1 &&
          divInicialX == divFinalX1 &&
          jogadaPossivel1) ||
        (divInicialY == divFinalY2 &&
          divInicialX == divFinalX2 &&
          jogadaPossivel1) ||
        (divInicialY == divFinalY3 &&
          divInicialX == divFinalX3 &&
          jogadaPossivel1) ||
        (divInicialY == divFinalY4 &&
          divInicialX == divFinalX4 &&
          jogadaPossivel1) ||
        (divInicialY == divFinalY5 &&
          divInicialX == divFinalX5 &&
          jogadaPossivel1) ||
        (divInicialY == divFinalY6 &&
          divInicialX == divFinalX6 &&
          jogadaPossivel1) ||
        (divInicialY == divFinalY7 &&
          divInicialX == divFinalX7 &&
          jogadaPossivel1) ||
        (divInicialY == divFinalY8 &&
          divInicialX == divFinalX8 &&
          jogadaPossivel1) ||
        (divInicialY == divFinalY9 &&
          divInicialX == divFinalX9 &&
          jogadaPossivel1)
      ) {
        if (quadrado.children.length > 0) {
          if (quadrado.children[0].className.includes("preto")) {
            if (this.cor == "preto") {
            } else {
              var pecasMortas = document.getElementById("pecas-brancas-mortas");

              quadrado.firstChild.draggable = false;
              if (quadrado.firstChild.name.includes("rei")) {
                var branco = "branco";
                this.ganhou(branco);
                console.log(this);
              }
              pecasMortas.appendChild(quadrado.firstChild);
            }
          } else {
            if (this.cor == "branco") {
            } else {
              var pecasMortas = document.getElementById("pecas-pretas-mortas");
              if (quadrado.firstChild.name.includes("rei")) {
                var preto = "preto";
                this.ganhou(preto);
              }
              quadrado.firstChild.draggable = false;
              pecasMortas.appendChild(quadrado.firstChild);
            }
          }
        }
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        testaImparPar();
      } else {
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);
        var quadradoAntigo = document.getElementById(`${divInicial}`);
        quadradoAntigo.appendChild(img);
      }
    }
  }
}
export class Rei extends Peca {
  constructor(nome, id, image, cor) {
    super(nome, id, image, cor);
  }
  criaPeca() {
    var img = document.createElement("img");
    img.setAttribute("draggable", true);
    img.setAttribute("class", `item ${this.cor}`);
    img.src = this.image;
    img.id = this.id + "image";
    img.name = this.nome;
    var index = document.getElementById(this.id);
    index.appendChild(img);

    var itens = document.querySelectorAll(".item");
    var quadrados = document.querySelectorAll(".quadrado");

    itens.forEach((item) => {
      item.addEventListener("dragstart", this.moving);
    });
    quadrados.forEach((quadrado) => {
      quadrado.addEventListener("dragover", this.dragOver);
      quadrado.addEventListener("drop", (e) => this.dropEvent(e, quadrado));
      quadrado.addEventListener("dragleave", this.dragLeave);
    });
  }
  moving(e) {
    e.dataTransfer.setData("text1", e.target.name);
    e.dataTransfer.setData("text2", e.target.id);
    e.dataTransfer.setData("text3", e.path[1].id);

    setTimeout((e) => {
      if (this.id == null) {
      } else {
        document.getElementById(`${this.id}`).remove();
      }
    });
  }

  dropEvent(e, quadrado) {
    e.preventDefault();

    var newNome = e.dataTransfer.getData("text1");
    var getId = e.dataTransfer.getData("text2");
    var newId = this.id + "image";
    var nomePeca = this.nome;
    var divInicial = e.dataTransfer.getData("text3");
    var divInicialY = divInicial.slice(3, 4);
    var divInicialX = divInicial.slice(1, 2);
    if (newNome == nomePeca && getId == newId) {
      var divFinal = quadrado.id;
      var divFinalY = divFinal.slice(3, 4);
      var divFinalX = divFinal.slice(1, 2);
      var y = divFinalX - divInicialX;
      var x = divFinalY - divInicialY;
      if (y < 0) {
        y *= -1;
      }
      if (x < 0) {
        x *= -1;
      }
      var jogadaPossivel;
      var jogadaPossivel1;
      if (
        (y == 0 && x == 0) ||
        (y == 1 && x == 0) ||
        (y == 0 && x == 1) ||
        (y == 1 && x == 1)
      ) {
        jogadaPossivel = true;
      } else {
        jogadaPossivel = false;
      }

      if (quadrado.children.length > 0) {
        if (quadrado.children[0].className.includes("preto")) {
          if (this.cor == "preto") {
            jogadaPossivel1 = false;
          } else {
            jogadaPossivel1 = true;
          }
        } else {
          if (this.cor == "branco") {
            jogadaPossivel1 = false;
          } else {
            jogadaPossivel1 = true;
          }
        }
      } else {
        jogadaPossivel1 = true;
      }

      if (jogadaPossivel && jogadaPossivel1) {
        if (quadrado.children.length > 0) {
          if (quadrado.children[0].className.includes("preto")) {
            if (this.cor == "preto") {
            } else {
              var pecasMortas = document.getElementById("pecas-brancas-mortas");

              quadrado.firstChild.draggable = false;
              if (quadrado.firstChild.name.includes("rei")) {
                var branco = "branco";
                this.ganhou(branco);
                console.log(this);
              }
              pecasMortas.appendChild(quadrado.firstChild);
            }
          } else {
            if (this.cor == "branco") {
            } else {
              var pecasMortas = document.getElementById("pecas-pretas-mortas");
              if (quadrado.firstChild.name.includes("rei")) {
                var preto = "preto";
                this.ganhou(preto);
              }
              quadrado.firstChild.draggable = false;
              pecasMortas.appendChild(quadrado.firstChild);
            }
          }
        }
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        if ((this.cor = "preto")) {
          jogadasReiPreto += 1;
        } else if ((this.cor = "branco")) {
          jogadasReiBranco += 1;
        }
        testaImparPar();
      } else {
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);
        var quadradoAntigo = document.getElementById(`${divInicial}`);
        quadradoAntigo.appendChild(img);
      }
    }
  }
}
export class Rainha extends Peca {
  constructor(nome, id, image, cor) {
    super(nome, id, image, cor);
  }
  criaPeca() {
    var img = document.createElement("img");
    img.setAttribute("draggable", true);
    img.setAttribute("class", `item ${this.cor}`);
    img.src = this.image;
    img.id = this.id + "image";
    img.name = this.nome;
    var index = document.getElementById(this.id);
    index.appendChild(img);

    var itens = document.querySelectorAll(".item");
    var quadrados = document.querySelectorAll(".quadrado");

    itens.forEach((item) => {
      item.addEventListener("dragstart", this.moving);
    });
    quadrados.forEach((quadrado) => {
      quadrado.addEventListener("dragover", this.dragOver);
      quadrado.addEventListener("drop", (e) => this.dropEvent(e, quadrado));
      quadrado.addEventListener("dragleave", this.dragLeave);
    });
  }
  moving(e) {
    e.dataTransfer.setData("text1", e.target.name);
    e.dataTransfer.setData("text2", e.target.id);
    e.dataTransfer.setData("text3", e.path[1].id);

    setTimeout((e) => {
      if (this.id == null) {
      } else {
        document.getElementById(`${this.id}`).remove();
      }
    });
  }

  dropEvent(e, quadrado) {
    e.preventDefault();

    var newNome = e.dataTransfer.getData("text1");
    var getId = e.dataTransfer.getData("text2");
    var newId = this.id + "image";
    var nomePeca = this.nome;
    var divInicial = e.dataTransfer.getData("text3");
    var divInicialY = divInicial.slice(3, 4);
    var divInicialX = divInicial.slice(1, 2);
    var jogadaPossivel1;
    var jogadaPossivel2 = true;
    if (newNome == nomePeca && getId == newId) {
      var divFinal = quadrado.id;
      var divFinalY = divFinal.slice(3, 4);
      var divFinalX = divFinal.slice(1, 2);

      var diferencaY = divInicialX - divFinalX;
      var diferencaX = divInicialY - divFinalY;

      divInicialY = parseInt(divInicialY);
      divInicialX = parseInt(divInicialX);

      var contador = 0;

      var divFinalY1 = parseInt(divFinalY) + 1;
      var divFinalX1 = parseInt(divFinalX) + 1;
      var divFinalY2 = parseInt(divFinalY) + 2;
      var divFinalX2 = parseInt(divFinalX) + 2;
      var divFinalY3 = parseInt(divFinalY) + 3;
      var divFinalX3 = parseInt(divFinalX) + 3;
      var divFinalY4 = parseInt(divFinalY) + 4;
      var divFinalX4 = parseInt(divFinalX) + 4;
      var divFinalY5 = parseInt(divFinalY) + 5;
      var divFinalX5 = parseInt(divFinalX) + 5;
      var divFinalY6 = parseInt(divFinalY) + 6;
      var divFinalX6 = parseInt(divFinalX) + 6;
      var divFinalY7 = parseInt(divFinalY) + 7;
      var divFinalX7 = parseInt(divFinalX) + 7;

      var divFinalY01 = parseInt(divFinalY) - 1;
      var divFinalX01 = parseInt(divFinalX) - 1;
      var divFinalY02 = parseInt(divFinalY) - 2;
      var divFinalX02 = parseInt(divFinalX) - 2;
      var divFinalY03 = parseInt(divFinalY) - 3;
      var divFinalX03 = parseInt(divFinalX) - 3;
      var divFinalY04 = parseInt(divFinalY) - 4;
      var divFinalX04 = parseInt(divFinalX) - 4;
      var divFinalY05 = parseInt(divFinalY) - 5;
      var divFinalX05 = parseInt(divFinalX) - 5;
      var divFinalY06 = parseInt(divFinalY) - 6;
      var divFinalX06 = parseInt(divFinalX) - 6;
      var divFinalY07 = parseInt(divFinalY) - 7;
      var divFinalX07 = parseInt(divFinalX) - 7;

      if (quadrado.children.length > 0) {
        if (quadrado.children[0].className.includes("preto")) {
          if (this.cor == "preto") {
            jogadaPossivel1 = false;
          } else {
            jogadaPossivel1 = true;
          }
        } else {
          if (this.cor == "branco") {
            jogadaPossivel1 = false;
          } else {
            jogadaPossivel1 = true;
          }
        }
      } else {
        jogadaPossivel1 = true;
      }
      if (diferencaY == diferencaX && diferencaX > 0 && diferencaY > 0) {
        for (var i = 1; i < diferencaY; i++) {
          var pecasEntre = document.getElementById(
            `i${divInicialX - i}e${divInicialY - i}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      } else if (diferencaY == diferencaX && diferencaX < 0 && diferencaY < 0) {
        for (var i = -1; i > diferencaY; i -= 1) {
          var pecasEntre = document.getElementById(
            `i${divInicialX - i}e${divInicialY - i}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      }
      if (diferencaY == -diferencaX && diferencaY > 0) {
        for (var i = 1; i < diferencaY; i++) {
          var pecasEntre = document.getElementById(
            `i${divInicialX - i}e${divInicialY + i}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      } else if (diferencaY == -diferencaX && diferencaX > 0) {
        for (var i = 1; i < diferencaX; i++) {
          var pecasEntre = document.getElementById(
            `i${divInicialX + i}e${divInicialY - i}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        }
      }

      if (diferencaY > 0 && divInicialY == divFinalY && diferencaX == 0) {
        for (var i = 1; i < diferencaY; i++) {
          var pecasEntre = document.getElementById(
            `i${divInicialX - i}e${divInicialY}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      } else if (
        diferencaY < 0 &&
        divInicialY == divFinalY &&
        diferencaX == 0
      ) {
        for (var i = -1; i > diferencaY; i -= 1) {
          var pecasEntre = document.getElementById(
            `i${divInicialX - i}e${divInicialY}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      }

      if (diferencaX > 0 && divInicialX == divFinalX && diferencaY == 0) {
        for (var i = 1; i < diferencaX; i++) {
          var pecasEntre = document.getElementById(
            `i${divInicialX}e${divInicialY - i}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      } else if (
        diferencaX < 0 &&
        divInicialX == divFinalX &&
        diferencaY == 0
      ) {
        for (var i = -1; i > diferencaX; i -= 1) {
          var pecasEntre = document.getElementById(
            `i${divInicialX}e${divInicialY - i}`
          );

          if (pecasEntre.children.length > 0) {
            contador += 1;
          } else {
            contador += 0;
          }
        }
        if (contador != 0) {
          jogadaPossivel2 = false;
        } else {
          jogadaPossivel2 = true;
        }
      }

      if (
        (divInicialY == divFinalY1 &&
          divInicialX == divFinalX1 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY2 &&
          divInicialX == divFinalX2 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY3 &&
          divInicialX == divFinalX3 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY4 &&
          divInicialX == divFinalX4 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY5 &&
          divInicialX == divFinalX5 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY6 &&
          divInicialX == divFinalX6 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY7 &&
          divInicialX == divFinalX7 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY01 &&
          divInicialX == divFinalX01 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY02 &&
          divInicialX == divFinalX02 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY03 &&
          divInicialX == divFinalX03 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY04 &&
          divInicialX == divFinalX04 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY05 &&
          divInicialX == divFinalX05 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY06 &&
          divInicialX == divFinalX06 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY07 &&
          divInicialX == divFinalX07 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY1 &&
          divInicialX == divFinalX01 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY2 &&
          divInicialX == divFinalX02 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY3 &&
          divInicialX == divFinalX03 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY4 &&
          divInicialX == divFinalX04 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY5 &&
          divInicialX == divFinalX05 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY6 &&
          divInicialX == divFinalX06 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY7 &&
          divInicialX == divFinalX07 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY01 &&
          divInicialX == divFinalX1 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY02 &&
          divInicialX == divFinalX2 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY03 &&
          divInicialX == divFinalX3 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY04 &&
          divInicialX == divFinalX4 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY05 &&
          divInicialX == divFinalX5 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY06 &&
          divInicialX == divFinalX6 &&
          jogadaPossivel1 &&
          jogadaPossivel2) ||
        (divInicialY == divFinalY07 &&
          divInicialX == divFinalX7 &&
          jogadaPossivel1 &&
          jogadaPossivel2)
      ) {
        if (quadrado.children.length > 0) {
          if (quadrado.children[0].className.includes("preto")) {
            if (this.cor == "preto") {
            } else {
              var pecasMortas = document.getElementById("pecas-brancas-mortas");

              quadrado.firstChild.draggable = false;
              if (quadrado.firstChild.name.includes("rei")) {
                var branco = "branco";
                this.ganhou(branco);
                console.log(this);
              }
              pecasMortas.appendChild(quadrado.firstChild);
            }
          } else {
            if (this.cor == "branco") {
            } else {
              var pecasMortas = document.getElementById("pecas-pretas-mortas");
              if (quadrado.firstChild.name.includes("rei")) {
                var preto = "preto";
                this.ganhou(preto);
              }
              quadrado.firstChild.draggable = false;
              pecasMortas.appendChild(quadrado.firstChild);
            }
          }
        }

        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        testaImparPar();
      } else if (
        divInicialY == divFinalY &&
        jogadaPossivel1 &&
        jogadaPossivel2
      ) {
        if (quadrado.children.length > 0) {
          if (quadrado.children[0].className.includes("preto")) {
            if (this.cor == "preto") {
            } else {
              var pecasMortas = document.getElementById("pecas-brancas-mortas");

              quadrado.firstChild.draggable = false;
              if (quadrado.firstChild.name.includes("rei")) {
                var branco = "branco";
                this.ganhou(branco);
                console.log(this);
              }
              pecasMortas.appendChild(quadrado.firstChild);
            }
          } else {
            if (this.cor == "branco") {
            } else {
              var pecasMortas = document.getElementById("pecas-pretas-mortas");
              if (quadrado.firstChild.name.includes("rei")) {
                var preto = "preto";
                this.ganhou(preto);
              }
              quadrado.firstChild.draggable = false;
              pecasMortas.appendChild(quadrado.firstChild);
            }
          }
        }

        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        testaImparPar();
      } else if (
        divInicialX == divFinalX &&
        jogadaPossivel1 &&
        jogadaPossivel2
      ) {
        if (quadrado.children.length > 0) {
          if (quadrado.children[0].className.includes("preto")) {
            if (this.cor == "preto") {
            } else {
              var pecasMortas = document.getElementById("pecas-brancas-mortas");

              quadrado.firstChild.draggable = false;
              if (quadrado.firstChild.name.includes("rei")) {
                var branco = "branco";
                this.ganhou(branco);
                console.log(this);
              }
              pecasMortas.appendChild(quadrado.firstChild);
            }
          } else {
            if (this.cor == "branco") {
            } else {
              var pecasMortas = document.getElementById("pecas-pretas-mortas");
              if (quadrado.firstChild.name.includes("rei")) {
                var preto = "preto";
                this.ganhou(preto);
              }
              quadrado.firstChild.draggable = false;
              pecasMortas.appendChild(quadrado.firstChild);
            }
          }
        }

        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);

        quadrado.appendChild(img);
        testaImparPar();
      } else {
        var img = document.createElement("img");
        img.setAttribute("draggable", true);
        img.setAttribute("class", `item ${this.cor}`);
        img.src = this.image;
        img.id = this.id + "image";
        img.name = this.nome;

        img.addEventListener("dragstart", this.moving);
        var quadradoAntigo = document.getElementById(`${divInicial}`);
        quadradoAntigo.appendChild(img);
      }
    }
  }
}
