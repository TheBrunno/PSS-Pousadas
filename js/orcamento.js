const button = document.querySelector("#btnCalc");
const containerOrcamento = document.querySelector(".containerOrcamento");
const previewLocal = document.querySelector(".viewChoiceWrapper");
const choiceLocal = document.querySelector(".choiceWrapper");

// error locals
const selectError = document.querySelector(".selectError");
const hospedesError = document.querySelector(".hospedesError");
const diariasError = document.querySelector(".diariasError");

button.addEventListener('click', () => {
    const refeicoesRadioButtons = document.querySelectorAll(".servicos-container input[type='radio']");
    const servicosAdicionaisCheckbox = document.querySelectorAll(".servicos-container input[type='checkbox']");

    const checkLocals = [refeicoesRadioButtons, servicosAdicionaisCheckbox];
    const precosSuites = [undefined, 899.47, 1439.16, 1798.95, 1475.14, 1331.22];
    const nomesSuites = [undefined, 'Suíte Mar', 'Suíte Executiva', 'Suíte Master', 'Suíte Oceano', 'Suíte Praia'];

    const idSuite = Number(document.querySelector("#suiteSelect").selectedIndex);
    const nHospedes = Number(document.querySelector("#nHospedes").value);
    const nDiarias = Number(document.querySelector("#nDiarias").value);

    let totalValor = 0;
    let refeicao;
    let servicosAdicionaisNomes = [];
    let servicosAdicionaisPrecos = [];

    if(idSuite === 0){ selectError.classList.remove("notVisible"); }
    else{ selectError.classList.add("notVisible"); }
    if(nHospedes === 0){ hospedesError.classList.remove("notVisible"); }
    else{ hospedesError.classList.add("notVisible"); }
    if(nDiarias === 0){ diariasError.classList.remove("notVisible"); }
    else{ diariasError.classList.add("notVisible"); }

    if(idSuite !== 0 && nHospedes > 0 && nDiarias > 0){
        for(let i=0; i<2; i++){
            for(e of checkLocals[i]){
                if(e.checked && e.type == 'radio'){
                    refeicao = document.querySelector(`label[for="${e.id}"]`).textContent;
                    totalValor+=Number(e.value)*nDiarias*nHospedes;
                }else if(e.checked && e.type == 'checkbox'){
                    totalValor+=Number(e.value)*nHospedes;
                    servicosAdicionaisNomes.push(document.querySelector(`label[for="${e.id}"]`).textContent);
                    servicosAdicionaisPrecos.push(e.value);
                }
            }
        }
        totalValor += precosSuites[idSuite]*nHospedes*nDiarias;
        previewLocal.classList.remove("notVisible");
        previewLocal.classList.add("fadeAnimation");
        choiceLocal.classList.add("leftAnimation");

        const leftSidePreviewLocal = document.querySelector("#leftSide");
        const rightSidePreviewLocal = document.querySelector("#rightSide");
        const valorPreviewLocal = document.querySelector(".valor");

        leftSidePreviewLocal.innerHTML = '';
        rightSidePreviewLocal.innerHTML = '';
        valorPreviewLocal.innerHTML = '';

        leftSidePreviewLocal.innerHTML = `
            <div class="card appear" id="orcamentoCard">
                <img src="../images/suites/photo${idSuite}.png" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${nomesSuites[idSuite]}</h5>
                    <span class="btn btn-primary">${precosSuites[idSuite].toLocaleString('pt-br', { style:'currency', currency:'MEX' })}</span>
                </div>
            </div>
        `;
        rightSidePreviewLocal.innerHTML+=`
            <h5 style="margin-top: 20px;">Serviços:</h5>
            <p>Nº de hóspedes: <span style="font-weight: 700; color: var(--blue);">${nHospedes}</span></p>
            <p>Nº de diárias: <span style="font-weight: 700; color: var(--blue);">${nDiarias}</span></p>
            <p>Tipo de refeição: <span style="font-weight: 700; color: var(--blue);">${refeicao}</span></p>
        `;
        for(let i=0; i<servicosAdicionaisNomes.length; i++){
            if(i==0){
                rightSidePreviewLocal.innerHTML+='<h5 style="margin-top: 20px;">Serviços adicionais: (por pessoa)</h5>';
            }
            rightSidePreviewLocal.innerHTML+=`
                <p>
                    <span style="font-weight: 700; color: var(--blue);">${servicosAdicionaisNomes[i]}</span> +${Number(servicosAdicionaisPrecos[i]).toLocaleString('pt-br', { style:'currency', currency:'MEX' })}
                </p>
            `;
        }
        valorPreviewLocal.innerHTML+=`
            <h5 style="text-align:center;">
                Valor total: ${totalValor.toLocaleString('pt-br', { style:'currency', currency:'MEX' })} / <span id="convertedValue"></span>
            </h5>
        `;
        MXNtoBRL(totalValor);
    }
});