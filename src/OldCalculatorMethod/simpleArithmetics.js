const MATHEMATICAL_OPERATIONS = {
    PLUS: '+',
    MINUS: '-',
    MULTIPLE: '*'
}

function defineBasicMathematicalOperation(value) {
    if (/[+]/.test(value)) return MATHEMATICAL_OPERATIONS.PLUS;
    if (/[-]/.test(value)) return MATHEMATICAL_OPERATIONS.MINUS;
    if (/[*]/.test(value)) return MATHEMATICAL_OPERATIONS.MULTIPLE;
    return '';
}

function simpleArithmetics(value) {
    const operationSign = defineBasicMathematicalOperation(value);
    const [operand1, operand2] = value.split(operationSign).map(str => parseInt(str.trim()));
    switch (operationSign) {
        case MATHEMATICAL_OPERATIONS.PLUS:
            {
                const result = operand1 + operand2;
                printResult(operand1, operand2, result, MATHEMATICAL_OPERATIONS.PLUS);
                break;
            }
        case MATHEMATICAL_OPERATIONS.MINUS:
            {
                const result = operand1 - operand2;
                printResult(operand1, operand2, result, MATHEMATICAL_OPERATIONS.MINUS);
                break;
            }
        case MATHEMATICAL_OPERATIONS.MULTIPLE:
            multiplicationPrintRes(operand1, operand2);
            break;
        default:
            console.log('Error');
            return "Error";
    }
}

function printResult(operand1, operand2, result, sign) {
    const maxLength = Math.max(operand1.toString().length, operand2.toString().length + 1, result.toString().length);
    const operand1Formatted = operand1.toString().padStart(maxLength, ' ');
    const operand2Formatted = `${(sign + operand2.toString()).padStart(maxLength, ' ')}`;
    const line = '-'.repeat(maxLength);
    const resultFormatted = result.toString().padStart(maxLength, ' ');
    console.log(`${operand1Formatted}\n${operand2Formatted}\n${line}\n${resultFormatted}`);
}
function multiplicationPrintRes(operand1, operand2) {
    const result = operand1 * operand2;
    const maxLength = Math.max(operand1.toString().length, operand2.toString().length + 1, result.toString().length);
    const strOperand2 = operand2.toString();
    const printResult = [];

    strOperand2.split('').reverse().forEach(digitChar => {
        const res = operand1 * parseInt(digitChar);
        printResult.push(res.toString());
    });

    const operand1Formatted = operand1.toString().padStart( maxLength, ' ');
    const operand2Formatted = `${('*' + strOperand2).padStart(maxLength, ' ')}`;
    const line1 = '-'.repeat(Math.max(operand1.toString().length, strOperand2.length, printResult[0].length)).padStart(maxLength, ' ');
    let printRes = `${operand1Formatted}\n${operand2Formatted}\n${line1}`;

    if (strOperand2.length > 1) {
        printResult.push(result.toString());
        printResult.splice(printResult.length - 1, 0, '-'.repeat(maxLength));
    }

    printResult.forEach((val, i) => {
        printRes += `\n${val.padStart(maxLength - i, ' ')}`;
    });
    
    // console.log(`printRes\n${printRes}`);
    console.log(printRes);
}

simpleArithmetics('1234*4');
simpleArithmetics('12345+67890');
simpleArithmetics('12345+890');
simpleArithmetics('324-111');
simpleArithmetics('325*4405');
simpleArithmetics('999*4409');
simpleArithmetics('4405*325');
simpleArithmetics('4405*25');
simpleArithmetics('1234*4');