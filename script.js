const form = document.querySelector('form');
const amountField = form.querySelector('#amount');
const currencyField = form.querySelector('#currency');
const submitButton = form.querySelector('button');

const footerBox = document.querySelector('footer');
const description = document.querySelector('#description');
const resultValue = document.querySelector('#result');

const dolarQuote = 6.19;
const euroQuote = 6.46;
const gbpQuote = 7.79;


/**
 * Function to calculate Quote using amount value and returns value calculated.
 * @param {Number} amount Quantity to convert (input field value).
 */
function calculateQuote(amount) {
    let valueCalculated;

    let currency = currencyField.value;

    switch(currency) {
        case 'USD':
            valueCalculated = amount * dolarQuote;
        break;
        case 'EUR':
            valueCalculated = amount * euroQuote;
        break;
        case 'GBP':
            valueCalculated = amount * gbpQuote;
        break;
        default:
            alert('Selecione uma moeda para converter.');
        break;
    }

    return valueCalculated;
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    let amount = amountField.value;

    let valueConverted = calculateQuote(amount).toFixed(2);
    valueConverted = String(valueConverted);
    valueConverted = valueConverted.replace(".", ",");
    
    if(amount !== '' && currencyField.value !== ''){
        footerBox.style.display = 'inherit';
        description.textContent = `${(currencyField.value === 'USD') ? `US$ 1 = ${formatCurrencyBRL(dolarQuote)}` : currencyField.value === 'EUR' ? `EUR€ 1 = ${formatCurrencyBRL(euroQuote)}` : `GBP£ 1 = ${formatCurrencyBRL(gbpQuote)}` }`;
        resultValue.textContent = `${valueConverted} Reais`;
    } else {
        alert('Preencha os campos obrigatórios');
    }
})

amountField.addEventListener('input', () => {
    
    const hasCharactersRegex = /\D+/g;
    amountField.value = amountField.value.replace(hasCharactersRegex, "");
})

/**
 * Function to format the currency in Brazilian Real.
 * @param {Number} value Quote of currency 
 * @returns Currency formated using pt-BR currency style.
 */
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}