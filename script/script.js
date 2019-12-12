
// INITIALIZATION VARIABLES ***************************
const numDisplay = document.getElementById('number-display');
numDisplay.innerText = "0";

const numBtns = document.querySelectorAll('#btns > .row > .operand');
const opBtns = document.querySelectorAll('#btns > .row > .operator');

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
  // keeps the number display from acting crazy upon user's first input
  if(!displayLockOn && e.target.id === "dot") {
    numDisplay.innerText = "0";
    displayVal = +numDisplay.innerText;
    displayLockOn = true;
  } else if (!displayLockOn && e.target.id === "zero") {
    numDisplay.innerText = "";
  } else if (!displayLockOn) {
    numDisplay.innerText = "";
    displayLockOn = true;
  }

  if (numDisplay.innerText.length < 10) {
    // allows zero as an initial value while stopping multiple zero entry
    if (e.target.id === "zero" && (displayVal === null || displayVal === undefined)) {
      numDisplay.innerText = "";
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
      decimal = true; // allows for one decimal per value
    } else {
      numDisplay.innerText += e.explicitOriginalTarget.innerText;
      displayVal = +numDisplay.innerText;
    }
  }
};

// KEYBOARD INPUT LOGIC ***************************
// Lots of duplicate code here. I'm sure there is a way to DRY this up, but I can't seem to get data from the clicks and keypresses to match
window.addEventListener('keydown', (e) => {
  // guard against unwanted keystrokes
  if (!((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) && (e.key !== "." &&
    e.key !== "Backspace" && e.key !== "Delete" && e.key !== "=" &&
    e.key !== "Enter" && e.key !== "+" && e.key !== "-" && e.key !== "*" &&
    e.key !== "/")) {
    return;
  }

  // for some reason, the keyboard requires this mess for it to work like the buttons do
  if(!displayLockOn && e.key === ".") {
    numDisplay.innerText = "0";
    displayVal = +numDisplay.innerText;
    displayLockOn = true;
  } else if (!displayLockOn && e.key === "0") {
    numDisplay.innerText = "";
  } else if (!displayLockOn && (e.key === "Enter" || e.key === "=")){
    return;
  } else if (!displayLockOn &&
      (e.key !== "+" && e.key !== "-" && e.key !== "*" && e.key !== "/")) {
    numDisplay.innerText = "";
    displayLockOn = true;
  }

  if (numDisplay.innerText.length < 10) {
    // allows zero as an initial value while stopping multiple zero entry
    if (e.key === "0" && (displayVal === null || displayVal === undefined)) {
      numDisplay.innerText = "";
      displayVal = "0";
      zeroLock = true;
    } else if (e.key === "0" && displayVal === 0 && zeroLock && !decimal){
      return;
    }

    if (e.key === "." && decimal) {
      return; // prevents multiple decimals
    } else if (e.key === "."){
      numDisplay.innerText += e.key;
      displayVal = +numDisplay.innerText;
      decimal = true; // allows for one decimal per value
    } else if ((e.keyCode >= 48 && e.keyCode <= 57) ||
          (e.keyCode >= 96 && e.keyCode <= 105)) {
      numDisplay.innerText += e.key;
      displayVal = +numDisplay.innerText;
    } else if (e.key === "Backspace") {
      // KEYBOARD OPERATOR LOGIC ***************************
      // A lot of reused spaghetti code here. Needs DRYing and refacotring.

      // backspace support
      const tempArr = numDisplay.innerText.split('');

      let popVal = tempArr.pop();
      if (popVal === ".") {
        decimal = false;
      }

      if (tempArr.length > 0) {
        numDisplay.innerText = tempArr.join('');
      } else {
        numDisplay.innerText = "0";
        displayLockOn = false;
      }

      displayVal = +numDisplay.innerText;

    } else if (e.key === "Delete") {

        decimal = false;
        displayLockOn = false;
        zeroLock = false;
        displayVal = null;

        if (num1 || num2) {
          num1 = null;
          num2 = null;
          func = null;
        }

        numDisplay.innerText = "0";

    } else if (e.key === "=" || e.key === "Enter") {

        decimal = false;
        keepRunningTotal();

    } else {

      decimal = false;

      if (!num1) {
        num1 = displayVal;
        displayLockOn = false;
      } else {
        keepRunningTotal();
      }

      switch (e.key) {
        case "+":
          func = add;
          break;
        case "-":
          func = subtract;
          break;
        case "*":
          func = multiply;
          break;
        case "/":
          func = divide;
          break;
        default:
          console.log("Key Error");
      }
    }
  }
});


// BUTTON OPERATOR LOGIC ***************************
opBtns.forEach((opBtn) => {
  opBtn.addEventListener('click', (e) => {

    // backspace support
    if (e.target.id === "backspace") {

      const tempArr = numDisplay.innerText.split('');

      let popVal = tempArr.pop();
      if (popVal === ".") {
        decimal = false;
      }

      if (tempArr.length > 0) {
        numDisplay.innerText = tempArr.join('');
      } else {
        numDisplay.innerText = "0";
        displayLockOn = false;
      }

      displayVal = +numDisplay.innerText;

    } else if (e.target.id === "clear-all") {

        decimal = false;
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

        decimal = false;
        keepRunningTotal();

    } else {

      decimal = false;

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

      numDisplay.innerText = +result.toFixed(10);

      num1 = operate(func, num1, num2);
      num2 = null;

  } else {
    return;
  }
  displayLockOn = false;
}
