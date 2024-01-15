

function checkTicTacToeConfiguration(value) {
    const ticTacToeAreaValues = value.join('').toLocaleLowerCase().split('');
    const x = ticTacToeAreaValues.filter(item => item === 'x').length;
    const o = ticTacToeAreaValues.filter(item => item === 'o').length;
    return console.log(x === o || x === o + 1 ? 'yes' : 'no');
}


/*
[
    ['...'],
    ['...'],
    ['...']
]
*/

checkTicTacToeConfiguration([['...'], ['...'], ['...']]); // ok
checkTicTacToeConfiguration([['x.o'], ['.x.'], ['xo.']]); // ok
checkTicTacToeConfiguration([['x..'], ['xo.'], ['.o.']]); // ok
checkTicTacToeConfiguration([['x.o'], ['.o.'], ['xo.']]); // no
checkTicTacToeConfiguration([['xx.'], ['xo.'], ['.ox']]); // no