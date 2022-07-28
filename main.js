let storeArray = [];
let currentStore = '';

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
    return x + y;
};

function minus(x, y) {
    return x - y;
};

function multiply(x, y) {
    return x * y;
};

function divide(x, y) {
    return x / y;
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




function storeInput(input) {
    if (isNumber(input)) {
        if (containsOperator(currentStore)) {
            storeArray.push(currentStore);
            currentStore = '';
        }
        currentStore += input

    } else if (containsOperator(input)) {
        if (currentStore === '') return;
        else if (containsOperator(currentStore)) currentStore = input;
        else {
            // currentStore contains numbers only
            storeArray.push(currentStore);
            currentStore = input;
        };
    };
};

function displayValue(value) {
    let display = document.querySelector('#display > div');
    display.textContent = value;
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



function operateArrayAll() {
    operateArray('*');
    operateArray('/');
    operateArray('+');
    operateArray('-');
};

function operateArray(operator) {
    let keepLooping = true;
    let i = 0;
    while (keepLooping) {
        if (storeArray[i] === operator) {
            let result = operate(storeArray[i - 1], storeArray[i], storeArray[i + 1]);
            storeArray.splice((i - 1), 3, result);
            i = 0;
            continue;
        }
        i++;
        if (i >= storeArray.length) keepLooping = false;
    };
};




function onClick(e) {
    let value = e.target.querySelector('div').textContent;

    if (value === '=') {
        updateForPressEqual()
    } else if (value === 'Clear') {
        clear()
    } else {
        storeInput(value);
        displayValue(currentStore);
    };
};

function updateForPressEqual() {
    if (isNumber(currentStore)) storeArray.push(parseFloat(currentStore));

    operateArrayAll();
    displayValue(storeArray[0]);
    storeArray = [];
    currentStore = '';
};


function clear() {
    storeArray = [];
    currentStore = '';
    displayValue('');
};