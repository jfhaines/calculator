let store = {num1: undefined, operator: undefined, num2: undefined};
let lastInput;

let buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('mouseenter', mouseEnterHandler);
    button.addEventListener('mouseleave', mouseLeaveHandler);
    button.addEventListener('mousedown', mouseDownHandler, {capture: true});
    button.addEventListener('mouseup', mouseUpHandler);
    button.addEventListener('click', clickHandler);
});

window.addEventListener('keydown', keyDownHandler);



function mouseEnterHandler(e) {
    e.target.classList.add('hover');
};

function mouseLeaveHandler(e) {
    e.target.classList.remove('hover');
};

function mouseDownHandler(e) {
    e.target.classList.add('click');
};

function mouseUpHandler(e) {
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


function operate({num1, operator, num2}) {
    if (operator === '+') {
        return sum(num1, num2);
    };

    if (operator === '-') {
        return minus(num1, num2);
    };

    if (operator === '*') {
        return multiply(num1, num2);
    };

    if (operator === '/') {
        return divide(num1, num2);
    };
};


function isNumber(string) {
    if (parseFloat(string)) return true;
    else if (string === '0') return true;
    else if (string === '.') return true;
    else return false;
};


function isOperator(string) {
    try {
        return string.match(/[+\-*/]/)
    } catch {
        return false;
    };
};


function isEmpty(value) {
    if (value === undefined) return true;
    else return false;
};


function isNotEmpty(value) {
    if (value !== undefined) return true;
    else return false;
};


function add(object, property, value) {
    if (isEmpty(object[property])) {
        object[property] = value;
    } else if (object[property].includes('.') && value === '.') {
        return;
    } else {
        object[property] = `${object[property]}` + `${value}`;
    };
};


function displayValue(value) {
    let display = document.querySelector('#display > div');
    display.textContent = value;
};


function clear() {
    store = [];
    displayValue('');
};


function storeValue(input) {
    if (isEmpty(store.num1)) {
        if (isNumber(input)) {
            return add(store, 'num1', input);
        };
        if (isOperator(input)) {
            return;
        };
    } else {
        if (isEmpty(store.operator)) {
            if (isNumber(input)) {
                if (lastInput === '=') {
                    return store.num1 = input;
                } else {
                    return add(store, 'num1', input);
                }
            };
            if (isOperator(input)) {
                return add(store, 'operator', input);
            };
        } else {
            if (isEmpty(store.num2)) {
                if (isNumber(input)) {
                    return add(store, 'num2', input);
                };
                if (isOperator(input)) {
                    return store.operator = input;
                };
            } else {
                if (isNumber(input)) {
                    return add(store, 'num2', input);
                };
                if (isOperator(input)) {
                    store = {num1: operate(store), operator: undefined, num2: undefined}
                    return store.operator = input;
                };
            };
        };
    };
};


function equalsHandler() {
    if (isNotEmpty(store.num1) && isNotEmpty(store.operator) && isEmpty(store.num2)) {
        store.num2 = store.num1;
        store = {num1: operate(store), operator: undefined, num2: undefined};
        return;
    };

    if (isNotEmpty(store.num1) && isNotEmpty(store.operator) && isNotEmpty(store.num2)) {
        let result;
        if (operate(store).toString().match(/.[0-9]{5,}/)) {
            result = operate(store).toFixed(5);
        } else {
            result = operate(store);
        };

        store = {num1: result, operator: undefined, num2: undefined};
        return;
    };
};


function clickHandler(e) {
    let value = e.target.querySelector('div').textContent;
    valueHandler(value);
};

function keyDownHandler(e) {
    valueHandler(e.key);
};


function valueHandler(value) {
        // store value
        if (value === '=') equalsHandler();
        else if (value === 'Clear') clear();
        else if (isNumber(value) || isOperator(value)) storeValue(value);
    
        // display value
        if (isNotEmpty(store.num2)) displayValue(store.num2);
        else if (isNotEmpty(store.num1)) displayValue(store.num1);
        else displayValue(0);
    
        // update last input
        lastInput = value;
};