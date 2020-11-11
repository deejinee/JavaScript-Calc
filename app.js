const calculator = {
  displayValue: "",
  firstOperand: null,
  waiting: false,
  operator: null,
};

const keys = document.querySelector(".buttonkeys");

keys.addEventListener("click", (event) => {
  const target = event.target;
  const value = target.value;
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("all-clear")) {
    clear();
    updateDisplay();
    return;
  }
  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("plusMinus")) {
    plusOrMinus();
    updateDisplay();
    return;
  }

  inputDigit(value);
  updateDisplay();
});

const inputDigit = (digit) => {
  const { displayValue, waiting } = calculator;

  if (waiting === true) {
    calculator.displayValue = digit;
    calculator.waiting = false;
  } else {
    calculator.displayValue =
      displayValue === "0" || displayValue == "NaN"
        ? digit
        : displayValue + digit;
  }
};

const updateDisplay = () => {
  const screen = document.querySelector("#display");
  screen.value = calculator.displayValue;
};

const inputDecimal = (dot) => {
  const { waiting } = calculator;
  if (waiting == true) {
    calculator.displayValue = "0.";
    calculator.waiting = false;
    return;
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
};

const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
    /*
    console.log(`${firstOperand} ${operator} ${inputValue} = ${result}`);*/
  }
  calculator.waiting = true;
  calculator.operator = nextOperator;
};

const calculate = (firstOperand, secondOperand, operator) => {
  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      return result;
      break;
    case "-":
      result = firstOperand - secondOperand;
      return result;
      break;
    case "*":
      result = firstOperand * secondOperand;
      return result;
      break;
    case "/":
      result = firstOperand / secondOperand;
      return result;
      break;
  }

  return secondOperand;
};

const percentage = () => {
  calculator.displayValue = calculator.displayValue / 100;
};
const plusOrMinus = () => {
  if (calculator.waiting) {
    calculator.displayValue =
    calculator.firstOperand = -parseFloat(
      calculator.displayValue
    );
  } else {
    calculator.displayValue = -parseFloat(calculator.displayValue);
  }

  updateDisplay();
};
const backspace = () =>{
  if(calculator.displayValue === "" || calculator.displayValue === NaN || calculator.displayValue  === null || calculator.displayValue=== "0"){
    calculator.displayValue="0";
    
  }
  else{
  calculator.displayValue=calculator.displayValue.slice(0, calculator.displayValue.length-1);}

  updateDisplay()
};



const clear = () => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waiting = false;
  calculator.operator = null;
  historydata = [];
};

document.querySelector(".backspace").addEventListener("click", backspace);


document.querySelector("#pct").addEventListener("click", percentage);
