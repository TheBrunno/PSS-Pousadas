const url = 'https://economia.awesomeapi.com.br/last/';
const coins = 'BRL-MXN';

async function MXNtoBRL(val){
    const convertedValue = document.querySelector('#convertedValue');
    
    const result = await fetch(url+coins).then((response) => { return response.json() })
    .then((data) => {
        return (val/data.BRLMXN.bid).toLocaleString('pt-br', { style:'currency', currency:'BRL' });
    });

    convertedValue.innerHTML = result;
}