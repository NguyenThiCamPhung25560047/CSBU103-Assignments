function calculate(op) {
    let a = parseFloat(document.getElementById("num1").value);
    let b = parseFloat(document.getElementById("num2").value);
    let result = 0;

    if (isNaN(a) || isNaN(b)) {
        alert("Please enter both numbers!");
        return;
    }

    switch(op) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b === 0) {
                alert("Cannot divide by zero!");
                return;
            }
            result = a / b;
            break;
        case '%':
            result = a % b;
            break;
    }

    document.getElementById("result").innerText = result;
}
