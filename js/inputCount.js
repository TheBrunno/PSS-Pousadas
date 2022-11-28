function stepper(button, local){
    const input = document.querySelector(`.${local} input[type="number"]`);
    const id = button.getAttribute("id");
    const min = input.getAttribute("min");
    const max = input.getAttribute("max");
    const step = input.getAttribute("step");
    const value = input.getAttribute("value");
    const calcStep = (id == 'menos') ? (step * -1) : (step*1);
    const newValue = parseInt(value) + calcStep;

    if(newValue >= min && newValue <= max){
        input.setAttribute("value", newValue);
    }

}