//Constants and DOM elements
const displayField = document.querySelector(".display-field");
const buttons = document.querySelectorAll(".buttons button");
const answerField = document.querySelector(".answer");

let displayOutput = "";
const operators = ["+", "-", "*", "/", "%", "="];

//validate the user input string
let operand1 = "";
let operand2 = "";
let operator = "";

const validatedInput = (inputValue) => {
  //Remove the unnessary value from the string like chars abd other special chars.
  let validatedValue = inputValue.replace(/[^-+*/%.=\d]+$/, "");

  let tempOperand1 = "";
  let tempOperand2 = "";
  let tempOperator = "";

  for (i = 0; i < validatedValue.length; i++) {
    //Check the first operand
    //If it is number
    if (!isNaN(validatedValue[i]) && tempOperator.length === 0) {
      tempOperand1 += validatedValue[i];
    }

    //If it is operator
    else if (
      operators.includes(validatedValue[i]) &&
      tempOperand1.length === 0
    ) {
      validatedValue = "";
    }

    //Check the operator
    else if (
      operators.includes(validatedValue[i]) &&
      tempOperand1.length > 0 &&
      tempOperator.length === 0
    ) {
      tempOperator = validatedValue[i];
    }

    //Check again it has operator or not
    else if (
      operators.includes(validatedValue[i]) &&
      tempOperator.length === 1
    ) {
      validatedValue = validatedValue.substring(0, validatedValue.length - 1);
    }

    //Check the second operand
    //If it is no
    else if (!isNaN(validatedValue[i]) && tempOperator.length === 1) {
      tempOperand2 += validatedValue[i];
    } else if (
      operators.includes(validatedValue[i]) &&
      tempOperand2.length > 0
    ) {
      validatedValue = validatedValue.substring(0, validatedValue.length - 1);
    }

    //Set the tempory variable values to gloable tempory variables
    if (i === validatedValue.length - 1) {
      operand1 = tempOperand1;
      operand2 = tempOperand2;
      operator = tempOperator;
    }
  }
  return validatedValue;
};

const calculate = (inputValue) => {
  let validatedValue = inputValue;
  let result = 0.0;

  //Automatic Calculations
  if (operator.length === 1 && operand1.length > 0 && operand2.length > 0) {
    if (operator == "+") {
      result = parseFloat(operand1) + parseFloat(operand2);
    } else if (operator == "-") {
      result = parseFloat(operand1) - parseFloat(operand2);
    } else if (operator == "*") {
      result = parseFloat(operand1) * parseFloat(operand2);
    } else if (operator == "/") {
      result = parseFloat(operand1) / parseFloat(operand2);
    } else if (operator == "%") {
      result = parseFloat(operand1) % parseFloat(operand2);
    }
  }
  answerField.textContent = result.toString();

  //Check the last sign is equal if it is calculate if it is
  if (validatedValue[validatedValue.length - 1] == "=") {
    result = "Ans " + result;
    answerField.textContent = result.toString();

    //clear the gloable
    operand1 = operand2 = operator = "";
  }
};

//For calculator Button event
displayField.value = displayOutput;
buttons.forEach((calButton) => {
  calButton.addEventListener("click", (e) => {
    //Only Display when operators and numbers are typing
    if (
      operators.includes(e.target.dataset.value) ||
      !isNaN(e.target.dataset.value)
    ) {
      //Clear all fields when starting a new calculation
      if (answerField.textContent.charAt(0) == "A") {
        displayOutput = "";
        displayField.value = "";
      }

      displayOutput = displayField.value + e.target.dataset.value;
      displayField.value = validatedInput(displayOutput);
      calculate(displayOutput);
    }

    //To clear all the items
    else if (e.target.dataset.value == "AC") {
      displayOutput = "";
      displayField.value = displayOutput;
    }
    //Do backspace
    else if (e.target.dataset.value == "CE" && displayOutput.length > 0) {
      displayOutput = displayOutput.substring(0, displayOutput.length - 1);
      displayField.value = validatedInput(displayOutput);
      calculate(displayOutput);
    }
  });
});

//For Keyboard inputs, cut and paste and deletion
displayField.addEventListener("input", (event) => {
  //Clear all fields when starting a new calculation
  if (answerField.textContent.charAt(0) == "A") {
    displayOutput = "";
    displayField.value = "";
  }

  displayOutput = event.target.value;
  displayField.value = validatedInput(displayOutput);
  calculate(displayOutput);
});
