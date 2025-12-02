const display = document.getElementById('display');
const modoPadrao = document.getElementById('padrao');
const modoCientifico = document.getElementById('cientifica');
const toggleBtn = document.getElementById('toggleMode');

let cientificaAtiva = false;
let historico = []; // Histórico dos cálculos

//--------------------------------------------
// INSERIR VALOR
//--------------------------------------------
function inserir(valor) {
  display.value += valor;
}

//--------------------------------------------
// LIMPAR TELA
//--------------------------------------------
function limpar() {
  display.value = '';
}

//--------------------------------------------
// APAGAR ÚLTIMO CARACTERE
//--------------------------------------------
function apagar() {
  display.value = display.value.slice(0, -1);
}

//--------------------------------------------
// PORCENTAGEM: transforma "50%" em "0.5"
//--------------------------------------------
function porcentagem() {
  try {
    let valor = parseFloat(display.value) / 100;
    display.value = valor;
  } catch {
    display.value = "Erro";
  }
}

//--------------------------------------------
// RAIZ QUADRADA
//--------------------------------------------
function raiz() {
  try {
    let valor = Math.sqrt(parseFloat(display.value));
    display.value = valor;
  } catch {
    display.value = "Erro";
  }
}

//--------------------------------------------
// CALCULAR (COM HISTÓRICO)
//--------------------------------------------
function calcular() {
  try {
    let expressao = display.value;
    let resultado = eval(expressao);

    // Adiciona ao histórico
    historico.push(`${expressao} = ${resultado}`);

    display.value = resultado;

  } catch {
    display.value = 'Erro';
    setTimeout(() => display.value = '', 2000);
  }
}

//--------------------------------------------
// MOSTRAR HISTÓRICO NA TELA
//--------------------------------------------
function mostrarHistorico() {
  if (historico.length === 0) {
    alert("Nenhum cálculo ainda.");
    return;
  }

  let lista = historico
    .map((item, index) => `${index + 1}. ${item}`)
    .join("\n");

  let escolha = prompt(
    "HISTÓRICO:\n" + lista + "\n\nDigite o número do cálculo para usar no visor:"
  );

  if (escolha && historico[escolha - 1]) {
    let valor = historico[escolha - 1].split("=")[1].trim();
    display.value = valor;
  }
}

//--------------------------------------------
// ALTERAR MODO
//--------------------------------------------
toggleBtn.addEventListener('click', () => {
  cientificaAtiva = !cientificaAtiva;

  if (cientificaAtiva) {
    modoPadrao.style.display = 'none';
    modoCientifico.style.display = 'grid';
    toggleBtn.textContent = 'Mudar para Padrão';
  } else {
    modoPadrao.style.display = 'grid';
    modoCientifico.style.display = 'none';
    toggleBtn.textContent = 'Mudar para Científica';
  }
});


// SUPORTE AO TECLADO
document.addEventListener("keydown", function (event) {
  const tecla = event.key;

  // Números 0–9
  if (!isNaN(tecla)) {
    inserir(tecla);
  }

  // Operadores básicos
  if (["+", "-", "*", "/"].includes(tecla)) {
    inserir(tecla);
  }

  // Decimal
  if (tecla === ".") {
    inserir(".");
  }

  // Enter → calcular
  if (tecla === "Enter") {
    calcular();
  }

  // Backspace → apagar
  if (tecla === "Backspace") {
    apagar();
  }

  // Escape → limpar
  if (tecla === "Escape") {
    limpar();
  }

  // Porcentagem
  if (tecla === "%") {
    porcentagem();
  }

  // Parênteses
  if (tecla === "(" || tecla === ")") {
    inserir(tecla);
  }
});

