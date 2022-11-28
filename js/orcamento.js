const button = document.querySelector("#btnCalc");

button.addEventListener('click', () => {
    const idSuite = Number(document.querySelector("#suiteSelect").selectedIndex);
    const nHospedes = Number(document.querySelector("#nHospedes").value);
    const nDiarias = Number(document.querySelector("#nDiarias").value);
    const refeicoesRadioButtons = document.querySelectorAll(".servicos-container input[type='radio']");
    const servicosAdicionaisCheckbox = document.querySelectorAll(".servicos-container input[type='checkbox']");

    const checkLocals = [refeicoesRadioButtons, servicosAdicionaisCheckbox];

    let totalValor = 0;
    if(idSuite !== 0 && nHospedes > 0 && nDiarias > 0){
        for(let i=0; i<2; i++){
            for(e of checkLocals[i]){
                if(e.checked && e.type == 'radio'){
                    totalValor+=Number(e.value)*nDiarias*nHospedes;
                }else if(e.checked && e.type == 'checkbox'){
                    totalValor+=Number(e.value)*nHospedes;
                }
            }
        }
    }

    console.log(totalValor);
})