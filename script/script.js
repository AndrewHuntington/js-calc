const numDisplay = document.getElementById('number-display');
numDisplay.innerText = "0";
let displayVal;
let displayLockOn = false;

const numBtns = document.querySelectorAll('#number-btns > button');
numBtns.forEach((numBtn) => {
  numBtn.addEventListener('click', (e) => {
    if (!displayLockOn) {
      numDisplay.innerText = "";
      if (!displayLockOn) {
        displayLockOn = true;
      }
    }

    if (numDisplay.innerText.length < 16) {
      numDisplay.innerText += e.explicitOriginalTarget.innerText;
      displayVal = +numDisplay.innerText;
      console.log(numDisplay.innerText.length);
    }
  });
});

const opBtns = document.querySelectorAll('#operators > button');
// operands
let num1;
let num2;
// operator function
let func;


opBtns.forEach((opBtn) => {
  opBtn.addEventListener('click', (e) => {

    if (e.target.id === "clear-all") {
      displayLockOn = false;

      if (num1 || num2) {
        num1 = null;
        num2 = null;
        func = null;
      }

      numDisplay.innerText = "0";

    } else if (e.target.id === "equals") {
        keepRunningTotal();
    } else {

      if (!num1) {
        num1 = displayVal;
        displayLockOn = false;
      } else {
        keepRunningTotal();
      }

      switch (e.target.id) {
        case "add":
          func = add;
          break;
        case "subtract":
          func = subtract;
          break;
        case "multiply":
          func = multiply;
          break;
        case "divide":
          func = divide;
          break;
        default:
          console.log("ERROR");
      }

    }

  })
});

// math town
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function operate(func, a, b) {
  return func(a, b);
}

function keepRunningTotal() {
  if ((num2 === undefined || num2 === null) && !func) {
    return; // should ignore equal btn press
  } else if (num2 == undefined || num2 == null){
    num2 = displayVal;
    displayVal = null; // protects against outputing wierd numbers if the user keeps clicking an operator key without entering a new value
  }
  // protects againstt divide by 0
  if (func === divide && num2 === 0) {
    num1 = null;
    num2 = null;
    func = null;

    numDisplay.innerText = "Whoops! Try again Charlie!";
    // displayLockOn = false;

  // protects against 0 being counted as false
  } else if ((func && num1 && num2) || (func && num1 === 0 && num2) ||
        (func && num1 && num2 == 0)) {

      numDisplay.innerText = operate(func, num1, num2);
      num1 = operate(func, num1, num2);
      num2 = null;

  } else {
    return;
  }
  displayLockOn = false;
}
