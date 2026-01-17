const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

//calculator memory
let currentValue = '';
let previousValue = '';
let operator = "";

buttons.forEach(button =>{
    button.addEventListener("click", () =>{
        const number = button.dataset.number;
        const action = button.dataset.action;
        const op = button.dataset.operator;

        if(number) handleNumber(number);
        if(action) handleAction(action);
        if(op) handleOperator(op);
    });
});
    function handleNumber(num){
        if(num ==='.' && currentValue.includes('.')) return;
        currentValue += num;
        display.value = currentValue;
    }
    
    function handleOperator(op){
        if(currentValue === '') return;
        if(op === "%"){
            currentValue = (parseFloat(currentValue) / 100).toString();
            display.value = currentValue;
            return;
        }
        if(previousValue !== ''){
            calculate(); 
        }
    operator = op;
    previousValue = currentValue;
    currentValue = '';
    }

function calculate(){
    let result;
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    if(isNaN(prev) || isNaN(curr)) return;
    switch(operator){
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr === 0 ? 'Error' : prev / curr;
            break;
        default:
            return;
    }
    display.value = result;
    currentValue = result.toString();
    previousValue = '';
    operator = '';
}

function handleAction(action){
    if(action === 'clear'){
        currentValue = '';
        previousValue = '';
        operator = '';
        display.value = '';
    }
    if(action === 'delete'){
        currentValue = currentValue.slice(0, -1);
        display.value = currentValue;
    }
    if(action === "equals"){
        calculate();
    }   
}
  