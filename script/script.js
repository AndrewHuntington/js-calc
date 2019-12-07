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
let displayVal;

const numBtns = document.querySelectorAll('#number-btns > button');
numBtns.forEach((numBtn) => {
  numBtn.addEventListener('click', (e) => {
    numDisplay.innerText = e.explicitOriginalTarget.innerText;
    displayVal = +e.explicitOriginalTarget.innerText;
    console.log(displayVal);
  });
});



//
// const btn2 = document.querySelector('#two');
// btn2.addEventListener('click', (e) => {
//   console.log(e.explicitOriginalTarget.innerText);
// });
