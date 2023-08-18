var palavras = [
  "ABACATE",
  "ABACAXI",
  "ACEROLA",
  "ACAI",
  "ARACA",
  "BACABA",
  "BACURI",
  "BANANA",
  "CAJA",
  "CAJU",
  "CARAMBOLA",
  "CUPUACU",
  "GRAVIOLA",
  "GOIABA",
  "JABUTICABA",
  "JENIPAPO",
  "MACA",
  "MANGABA",
  "MANGA",
  "MARACUJA",
  "MURICI",
  "PEQUI",
  "PITANGA",
  "PITAYA",
  "SAPOTI",
  "TANGERINA",
  "UMBU",
  "UVA",
  "UVAIA"
  ];
var palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];
let letrasAdvinhadas = [];

function exibirPalavra() {
    const containerPalavra = document.querySelector(".palavra");
    const palavraExibida = palavraSelecionada
        .split("")
        .map(letra => (letrasAdvinhadas.includes(letra) ? letra : "_"))
        .join(" ");
    
    containerPalavra.textContent = palavraExibida;

    if (!palavraExibida.includes("_")) {
        containerPalavra.textContent = `Parabéns! Você acertou a palavra! ${palavraSelecionada}`;
        botoesLetras.forEach(botao => {
            botao.disabled = true;
        });
    }
}

function escolherPalavra(){
  palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];
}

function adivinharLetra(letra) {
  letrasAdvinhadas.push(letra);
  exibirPalavra();

  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (!palavraSelecionada.includes(letra) && alfabeto.includes(letra)) {
        tentativasRestantes--;
        tentativasRestantesSpan.textContent = tentativasRestantes;
    
        if (tentativasRestantes == 0) {
            const botoesLetras = document.querySelectorAll(".letra");
            botoesLetras.forEach(botao => {
                botao.disabled = true;
            })
            const containerPalavra = document.querySelector(".palavra");
            containerPalavra.textContent = "Seu erro matou a sayori :C";                   
        }
        else {
            const numeroImagem = maxTentativas - tentativasRestantes + 1;
            imagemHomem.src = `Forca${numeroImagem}.png`;
        }
    }
}

function criarBotoesLetras() {
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const containerBotoesLetras = document.querySelector('.botoes-letras');
    
    for (let letra of alfabeto) {
      const botao = document.createElement('button');
      botao.textContent = letra;
      botao.classList.add('letra');
      containerBotoesLetras.appendChild(botao);
    }
  }

const maxTentativas = 5;
let tentativasRestantes = maxTentativas;
const imagemHomem = document.getElementById('homemImage').querySelector('img');
const tentativasRestantesSpan = document.getElementById('tentativasRestantes');


function reiniciarJogo() {
  escolherPalavra();
  letrasAdvinhadas = [];
  tentativasRestantes = maxTentativas;
  exibirPalavra();
  tentativasRestantesSpan.textContent = tentativasRestantes;
  imagemHomem.src = 'Forca1.png';
  
  
  const botoesLetras = document.querySelectorAll(".letra");
  botoesLetras.forEach(botao => {
      botao.disabled = false;
    });
}


document.addEventListener("DOMContentLoaded", function() {
    exibirPalavra();
    criarBotoesLetras();
  
    const botoesLetras = document.querySelectorAll(".letra");
    botoesLetras.forEach(botao => {
      botao.addEventListener("click", function() {
        const letra = botao.textContent;
        adivinharLetra(letra);
        botao.disabled = true;
      });
    });
  
    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", reiniciarJogo);
    
    
  });