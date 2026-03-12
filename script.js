const form = document.getElementById('converterForm')
const amount = document.getElementById('amount')
const fromCurrency = document.getElementById('fromCurrency')
const convertedAmount = document.getElementById('convertedAmount')
const toCurrency = document.getElementById('toCurrency')
const loading = document.querySelector('.loading')
const result = document.querySelector('.result')
const error = document.querySelector('.error')
const button = document.getElementById('converterBtn')

// URL da API de taxas de câmbio
const API_URL = 'https://api.exchangerate-api.com/v4/latest/'

// Função para converter a moeda
async function convert() {

    // Mostrar o loading e esconder os resultados anteriores
    loading.style.display = 'block'
    button.style.display = 'none'
    result.style.display = 'none'
    error.style.display = 'none'
    
    //tentar fazer a conversão, se der erro, mostrar mensagem de erro
    try {
        // Buscar a taxa de câmbio da API
        const response = await fetch(API_URL + fromCurrency.value)
        data = await response.json()
        const rate = data.rates[toCurrency.value]
        const convertedRate = (amount.value * rate).toFixed(2)

        // Exibir o resultado da conversão
        convertedAmount.value = convertedRate
        result.style.display = 'block'
        
        result.innerHTML =  `
        <div style="font-size: 1.4rem">
            ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
        </div>
        <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 10px;">
            Taxa de câmbio: 1 ${fromCurrency.value} = ${rate.toFixed(4)} ${toCurrency.value}
        </div>
        `

    }
    catch (err){
        error.style.display = 'block'
        error.innerHTML = 'Ocorreu um erro ao converter. Por favor, tente novamente.'
    }

    loading.style.display = 'none'
}

// Adicionar evento de submit ao formulário
form.addEventListener('submit', function(event) {
    event.preventDefault();
    convert();
});