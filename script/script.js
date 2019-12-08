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

const numDisplay = document.getElementById('number-display');
numDisplay.innerText = "0";
let displayVal;
let displayLockOn = true;

const numBtns = document.querySelectorAll('#number-btns > button');
numBtns.forEach((numBtn) => {
  numBtn.addEventListener('click', (e) => {
    console.log(`Locked? Outside: ${displayLockOn}`); // REMOVE
    if (numDisplay.innerText === "0" || !displayLockOn) {
      numDisplay.innerText = "";
      if (!displayLockOn) {
        displayLockOn = true;
      }
      console.log(`Locked? Inside: ${displayLockOn}`); // REMOVE
    }

    numDisplay.innerText += e.explicitOriginalTarget.innerText;
    displayVal = +numDisplay.innerText;
    console.log(displayVal); // for debugging TODO: REMOVE
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
    console.log(e.target.id); // REMOVE
    if (e.target.id === "clear-all") {

      if (num1 || num2) {
        num1 = null;
        num2 = null;
      }

      numDisplay.innerText = "0";

    } else if (e.target.id === "equals") {

        if (!num2 && !func) {
          return; // should ignore equal btn press
        } else if (num2 == undefined){
          num2 = displayVal;
        }

        if (func && num1 && num2) {
          numDisplay.innerText = operate(func, num1, num2);
        } else {
          return;
        }

    } else {

      // TODO: set logic for more than two numbers
      if (!num1) {
        num1 = displayVal;
        displayLockOn = false;
      }

      // if (!displayLockOn) {
      //   displayLockOn = true;
      // }

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
      console.log(func); // for debugging // TODO: REMOVE
    }

  })
});


//
// const btn2 = document.querySelector('#two');
// btn2.addEventListener('click', (e) => {
//   console.log(e.explicitOriginalTarget.innerText);
// });
