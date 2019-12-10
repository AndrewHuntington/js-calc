
// INITIALIZATION VARIABLES ***************************
const numDisplay = document.getElementById('number-display');
numDisplay.innerText = "0";

const numBtns = document.querySelectorAll('#number-btns > button');
const opBtns = document.querySelectorAll('#operators > button');

let displayVal;
let displayLockOn = false;
let decimal = false;
let zeroLock = false;
// operands
let num1;
let num2;
// operator function
let func;

// CLICK INPUT LOGIC ***************************
// I can't seem to figure out how to handle both click and keyboard input at the same time w/o spliting up the code for each
numBtns.forEach((numBtn) => {
  numBtn.addEventListener('click', (e) => {
      clickDataInput(e);
  });
});

function clickDataInput(e) {
  if (!displayLockOn) {
    numDisplay.innerText = "";
    displayLockOn = true;
  }

  if (numDisplay.innerText.length < 16) {
    // allows zero as an initial value while stopping multiple zero entry
    if (e.target.id === "zero" && (displayVal === null || displayVal === undefined)) {
      displayVal = "0";
      zeroLock = true;
    } else if (e.target.id === "zero" && displayVal === 0 && zeroLock && !decimal){
      return;
    }

    if (e.target.id === "dot" && decimal) {
      return; // prevents multiple decimals
    } else if (e.target.id === "dot"){
      numDisplay.innerText += e.explicitOriginalTarget.innerText;
      displayVal = +numDisplay.innerText;
      decimal = "true"; // allows for one decimal per value
    } else {
      numDisplay.innerText += e.explicitOriginalTarget.innerText;
      displayVal = +numDisplay.innerText;
    }
  }
};

// KEYBOARD INPUT LOGIC ***************************

//// TODO: find out how to key the keys to act like the buttons
window.addEventListener('keydown', (e) => {
  numDisplay.innerText += e.key;
  displayVal = +numDisplay.innerText;
});


// OPERATOR LOGIC ***************************
opBtns.forEach((opBtn) => {
  opBtn.addEventListener('click', (e) => {
    decimal = false; // allows decimal values again

    // backspace support
    if (e.target.id === "backspace") {

      const tempArr = numDisplay.innerText.split('');
      tempArr.pop();

      if (tempArr.length > 0) {
        numDisplay.innerText = tempArr.join('');
      } else {
        numDisplay.innerText = "0";
        displayLockOn = false;
      }

      displayVal = +numDisplay.innerText;

    } else if (e.target.id === "clear-all") {

        displayLockOn = false;
        zeroLock = false;
        displayVal = null;

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

// MATH LOGIC ***************************
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
  // protects against divide by 0
  if (func === divide && num2 === 0) {
    num1 = null;
    num2 = null;
    func = null;

    numDisplay.innerText = "Whoops! Try again Charlie!";

  // protects against 0 being counted as false
  } else if ((func && num1 && num2) || (func && num1 === 0 && num2) ||
        (func && num1 && num2 == 0)) {

      const result = operate(func, num1, num2);

      numDisplay.innerText = +result.toFixed(16);

      num1 = operate(func, num1, num2);
      num2 = null;

  } else {
    return;
  }
  displayLockOn = false;
}
