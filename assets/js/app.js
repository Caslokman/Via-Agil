const TEMPO_MAXIMO = 30 * 1000
let TEMPO_SEMAFORO = 30 * 1000
let TEMPO_EXTRA = 0
let PRIORITARIO = 1
let CONTADOR = 1
var SemaforoData




$.getJSON("assets/js/json/semaforos.json", function(json) {
  $('#cidade').append(json[0]['city']) //Pegando Json externo
})
SemaforoData = $.getJSON("assets/js/json/semaforos.json", function(json) {})
console.log(SemaforoData.Response)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}



$(document).ready(function () {
  $('#semaforo1').css('background-image', 'url("assets/img/sinal_verde.png")')
  $('#semaforo2').css('background-image', 'url("assets/img/sinal_vermelho.png")')

  calculaTrafico(3000)
  let timer = setInterval(function () {

    if (CONTADOR >= TEMPO_MAXIMO) {
      clearInterval(timer)
    }

    if (PRIORITARIO !== 2) {
      trocaSinal('#semaforo1', '#semaforo2', '1')
    } else {
      trocaSinal('#semaforo2', '#semaforo1', '2')
    }

    if (CONTADOR % 15) {
      prioridade()
    }

    console.log("[Semaforo] Trocado")
  }, TEMPO_SEMAFORO + TEMPO_EXTRA)

  async function prioridade() {
    if (PRIORITARIO === 1) {
      PRIORITARIO = 2
    } else {
      PRIORITARIO = 1
    }
  }

  /* Funções para Sinais*/
  async function sinalVerde(semaforo) {
    setTimeout(function () {
      $(semaforo).css('background-image', 'url("assets/images/sinal_verde.png")')
    }, 5000)
  }

  async function sinalVermelho(semaforo) {
    $(semaforo).css('background-image', 'url("assets/images/sinal_amarelo.png")')
    setTimeout(function () {
      $(semaforo).css('background-image', 'url("assets/images/sinal_vermelho.png")')
    }, 3000)

  }

  async function trocaSinal(semaforoOne, semaforoTwo, valor) {
    sinalVermelho(semaforoOne)
    sinalVerde(semaforoTwo)
    if (valor === 'undefined') {
      writeThat('#PRIORITARIO', valor)
    }
  }

  /* Função para escrita*/
  async function writeThat(id, valor) {
    $(id).empty()
    $(id).append(valor)
  }

  /* Função para trafico */

  async function calculaTrafico(valor) {
    if (valor < 1000) {
      TEMPO_EXTRA = 0
      console.log('[Tempo Extra] Sem Tempo Extra')
    } else if (valor >= 1000) {
      TEMPO_EXTRA = 3000
    } else if (valor >= 5000) {
      TEMPO_EXTRA = 4500
    } else if (valor >= 10000) {
      TEMPO_EXTRA = 7000
    } else if (valor >= 15000) {
      TEMPO_EXTRA = 1000
    } else if (valor >= 30000) {
      TEMPO_EXTRA = 2000
    }
    if (valor > 1) {
      console.log('[Tempo Extra] Valor: ' + TEMPO_EXTRA / 1000 + ' Segundos')
    }
  }
})