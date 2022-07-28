let store = [];

let buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('mouseenter', animateMouseEnter);
    button.addEventListener('mouseleave', animateMouseLeave);
    button.addEventListener('mousedown', animateMouseDown, {capture: true});
    button.addEventListener('mouseup', animateMouseUp);

    button.addEventListener('click', onClick);
});



function animateMouseEnter(e) {
    e.target.classList.add('hover');
};

function animateMouseLeave(e) {
    e.target.classList.remove('hover');
};

function animateMouseDown(e) {
    e.target.classList.add('click');
};

function animateMouseUp(e) {
    e.target.classList.remove('click');
};



function sum(x, y) {
    return parseFloat(x) + parseFloat(y);
};

function minus(x, y) {
    return parseFloat(x) - parseFloat(y);
};

function multiply(x, y) {
    return parseFloat(x) * (y);
};

function divide(x, y) {
    return parseFloat(x) / parseFloat(y);
};



function operate(x, operator, y) {
    if (operator === '+') {
        return sum(x, y);
    };

    if (operator === '-') {
        return minus(x, y);
    };

    if (operator === '*') {
        return multiply(x, y);
    };

    if (operator === '/') {
        return divide(x, y);
    };
};



function isNumber(string) {
    if (parseFloat(string)) return true;
    else if (string === '.') return true;
    else return false;
};

function containsOperator(string) {
    try {
        return string.match(/[+\-*/]/)
    } catch {
        return false;
    };
};

function storeInput(input) {
    console.log(input)
    if (isNumber(input)) {
        if (isNumber(store[store.length - 1])) {
            store[store.length - 1] += input;
        } else {
            store.push(input);
        };
    } else if (containsOperator(input)) {
        if (containsOperator(store[store.length - 1])) {
            store[store.length - 1] = input
        } else if (isNumber(store[store.length - 1])) {
            store.push(input);
        } else {
            return;
        };
    };
};

function displayValue(value) {
    let display = document.querySelector('#display > div');
    display.textContent = value;
};



function operateArray(operator) {
    let keepLooping = true;
    let i = 0;
    while (keepLooping) {
        if (store[i] === operator) {
            let result = operate(store[i - 1], store[i], store[i + 1]);
            store.splice((i - 1), 3, result);
            i = 0;
            continue;
        }
        i++;
        if (i >= store.length) keepLooping = false;
    };
};

function operateArrayAll() {
    operateArray('*');
    operateArray('/');
    operateArray('+');
    operateArray('-');
};

function updateForPressEqual() {
    operateArrayAll();
    displayValue(store[store.length - 1]);
    store = [];
};



function clear() {
    store = [];
    displayValue('');
};



function onClick(e) {
    let value = e.target.querySelector('div').textContent;

    if (value === '=') {
        updateForPressEqual()
    } else if (value === 'Clear') {
        clear()
    } else {
        storeInput(value);
        displayValue(store[store.length - 1]);
    };
};