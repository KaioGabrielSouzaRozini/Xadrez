import { Peao, Torre, Rainha, Rei, Cavalo, Bispo } from "/index.js";

var tabuleiroDOM = document.getElementById("tabuleiro");
var index = 1;
var tabuleiro2 = [
  [1, 2, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 2, 1],
];
const button = document.getElementById("disable");

button.addEventListener("click", savePlayers);

function startGame() {
  pintaTabuleiro2(tabuleiro2);
  //peças brancas
  var torreBranca1 = new Torre(
    "torreBranca1",
    "i0e0",
    "/imagens/torre-branca.png",
    "branco"
  );
  torreBranca1.criaPeca();
  var cavaloBranco1 = new Cavalo(
    "cavaloBranco1",
    "i0e1",
    "/imagens/cavalo-branco.png",
    "branco"
  );
  cavaloBranco1.criaPeca();
  var bispoBranco1 = new Bispo(
    "bispoBranco1",
    "i0e2",
    "/imagens/bispo-branco.png",
    "branco"
  );
  bispoBranco1.criaPeca();
  var reiBranco = new Rei(
    "reiBranco",
    "i0e3",
    "/imagens/rei-branco.png",
    "branco"
  );
  reiBranco.criaPeca();
  var rainhaBranca = new Rainha(
    "rainhaBranca",
    "i0e4",
    "/imagens/rainha-branca.png",
    "branco"
  );
  rainhaBranca.criaPeca();
  var bispoBranco2 = new Bispo(
    "bispoBranco2",
    "i0e5",
    "/imagens/bispo-branco.png",
    "branco"
  );
  bispoBranco2.criaPeca();
  var cavaloBranco2 = new Cavalo(
    "cavaloBranco2",
    "i0e6",
    "/imagens/cavalo-branco.png",
    "branco"
  );
  cavaloBranco2.criaPeca();
  var torreBranca2 = new Torre(
    "torreBranca2",
    "i0e7",
    "/imagens/torre-branca.png",
    "branco"
  );
  torreBranca2.criaPeca();
  //peoes brancos
  var peaoBranco1 = new Peao(
    "peaoBranco1",
    "i1e0",
    "/imagens/peao-branco.png",
    "branco"
  );
  peaoBranco1.criaPeca();
  var peaoBranco2 = new Peao(
    "peaoBranco2",
    "i1e1",
    "/imagens/peao-branco.png",
    "branco"
  );
  peaoBranco2.criaPeca();
  var peaoBranco3 = new Peao(
    "peaoBranco3",
    "i1e2",
    "/imagens/peao-branco.png",
    "branco"
  );
  peaoBranco3.criaPeca();
  var peaoBranco4 = new Peao(
    "peaoBranco4",
    "i1e3",
    "/imagens/peao-branco.png",
    "branco"
  );
  peaoBranco4.criaPeca();
  var peaoBranco5 = new Peao(
    "peaoBranco5",
    "i1e4",
    "/imagens/peao-branco.png",
    "branco"
  );
  peaoBranco5.criaPeca();
  var peaoBranco6 = new Peao(
    "peaoBranco6",
    "i1e5",
    "/imagens/peao-branco.png",
    "branco"
  );
  peaoBranco6.criaPeca();
  var peaoBranco7 = new Peao(
    "peaoBranco7",
    "i1e6",
    "/imagens/peao-branco.png",
    "branco"
  );
  peaoBranco7.criaPeca();
  var peaoBranco8 = new Peao(
    "peaoBranco8",
    "i1e7",
    "/imagens/peao-branco.png",
    "branco"
  );
  peaoBranco8.criaPeca();

  //peças pretas
  var torrePreta1 = new Torre(
    "torrePreta1",
    "i7e0",
    "/imagens/torre-preta.png",
    "preto"
  );
  torrePreta1.criaPeca();
  var cavaloPreto1 = new Cavalo(
    "cavaloPreto1",
    "i7e1",
    "/imagens/cavalo-preto.png",
    "preto"
  );
  cavaloPreto1.criaPeca();
  var bispoPreto1 = new Bispo(
    "bispoPreto1",
    "i7e2",
    "/imagens/bispo-preto.png",
    "preto"
  );
  bispoPreto1.criaPeca();
  var reiPreto = new Rei("reiPreto", "i7e3", "/imagens/rei-preto.png", "preto");
  reiPreto.criaPeca();
  var rainhaPreta = new Rainha(
    "rainhaPreta",
    "i7e4",
    "/imagens/rainha-preta.png",
    "preto"
  );
  rainhaPreta.criaPeca();
  var bispoPreto2 = new Bispo(
    "bispoPreto2",
    "i7e5",
    "/imagens/bispo-preto.png",
    "preto"
  );
  bispoPreto2.criaPeca();
  var cavaloPreto2 = new Cavalo(
    "cavaloPreto2",
    "i7e6",
    "/imagens/cavalo-preto.png",
    "preto"
  );
  cavaloPreto2.criaPeca();
  var torrePreta2 = new Torre(
    "torrePreta2",
    "i7e7",
    "/imagens/torre-preta.png",
    "preto"
  );
  torrePreta2.criaPeca();
  //peoes pretos
  var peaoPreto1 = new Peao(
    "peaoPreto1",
    "i6e0",
    "/imagens/peao-preto.png",
    "preto"
  );
  peaoPreto1.criaPeca();
  var peaoPreto2 = new Peao(
    "peaoPreto2",
    "i6e1",
    "/imagens/peao-preto.png",
    "preto"
  );
  peaoPreto2.criaPeca();
  var peaoPreto3 = new Peao(
    "peaoPreto3",
    "i6e2",
    "/imagens/peao-preto.png",
    "preto"
  );
  peaoPreto3.criaPeca();
  var peaoPreto4 = new Peao(
    "peaoPreto4",
    "i6e3",
    "/imagens/peao-preto.png",
    "preto"
  );
  peaoPreto4.criaPeca();
  var peaoPreto5 = new Peao(
    "peaoPreto5",
    "i6e4",
    "/imagens/peao-preto.png",
    "preto"
  );
  peaoPreto5.criaPeca();
  var peaoPreto6 = new Peao(
    "peaoPreto6",
    "i6e5",
    "/imagens/peao-preto.png",
    "preto"
  );
  peaoPreto6.criaPeca();
  var peaoPreto7 = new Peao(
    "peaoPreto7",
    "i6e6",
    "/imagens/peao-preto.png",
    "preto"
  );
  peaoPreto7.criaPeca();
  var peaoPreto8 = new Peao(
    "peaoPreto8",
    "i6e7",
    "/imagens/peao-preto.png",
    "preto"
  );
  peaoPreto8.criaPeca();
  var pecas = document.querySelectorAll(".preto");
  for (let i = 0; i < pecas.length; i++) {
    pecas[i].draggable = false;
  }
}
function savePlayers() {
  if (
    document.getElementById("player1").value != "" &&
    document.getElementById("player2").value != ""
  ) {
    startGame();
    const namePlayer1 = document.getElementById("player1").value;
    const namePlayer2 = document.getElementById("player2").value;

    const playerList = document.getElementById("players");
    const player = document.createElement("li");
    player.innerText = namePlayer1 + " VS " + namePlayer2;
    playerList.appendChild(player);
    button.removeEventListener("click", savePlayers);
    const input1 = document.getElementById("player1");
    document.getElementById("disable").addEventListener("click", function () {
      input1.setAttribute("disabled", !input1.disabled);
    });
    const input2 = document.getElementById("player2");
    document.getElementById("disable").addEventListener("click", function () {
      input2.setAttribute("disabled", !input2.disabled);
    });
    vez.innerText =
      "Vez do jogador: " + document.getElementById("player1").value;
    document.getElementById("tabuleiro").style.border = "20px solid #48332a";
  } else {
    alert("Coloque os nomes dos jogadores");
  }
}
export function testaImparPar() {
  if (index % 2 !== 0) {
    vez.innerText =
      "Vez do jogador: " + document.getElementById("player2").value;
    var pecas = document.querySelectorAll(".branco");
    for (let i = 0; i < pecas.length; i++) {
      pecas[i].draggable = false;
    }
    var pecas = document.querySelectorAll(".preto");
    for (let i = 0; i < pecas.length; i++) {
      pecas[i].draggable = true;
    }
  } else {
    vez.innerText =
      "Vez do jogador: " + document.getElementById("player1").value;
    var pecas = document.querySelectorAll(".preto");
    for (let i = 0; i < pecas.length; i++) {
      pecas[i].draggable = false;
    }
    var pecas = document.querySelectorAll(".branco");
    for (let i = 0; i < pecas.length; i++) {
      pecas[i].draggable = true;
    }
  }
  index++;
}
function pintaTabuleiro2(tabuleiro) {
  for (var i = 0; i < 8; i++) {
    for (var e = 0; e < 8; e++) {
      if (tabuleiro[i][e] == 1) {
        var quadrado = document.createElement("div");
        quadrado.setAttribute("id", `i${i}e${e}`);
        quadrado.setAttribute("class", "quadrado");

        quadrado.className += " quadradoPastel";

        tabuleiroDOM.appendChild(quadrado);
      } else if (tabuleiro[i][e] == 2) {
        var quadrado = document.createElement("div");
        quadrado.setAttribute("id", `i${i}e${e}`);
        quadrado.setAttribute("class", "quadrado");

        quadrado.className += " quadradoMarrom";

        tabuleiroDOM.appendChild(quadrado);
      }
    }
  }
}
