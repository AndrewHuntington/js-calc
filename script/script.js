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

const numDisplay = document.getElementById('display-numbers');

const btn = document.querySelector('#one');
btn.addEventListener('click', (e) => {
  console.log(e.explicitOriginalTarget.innerText);
  numDisplay.innerText = e.explicitOriginalTarget.innerText;
});

const btn2 = document.querySelector('#two');
btn2.addEventListener('click', (e) => {
  console.log(e.explicitOriginalTarget.innerText);
});
