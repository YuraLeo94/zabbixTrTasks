function countStartEndLettersInWords(value) {
    const startLetters = {};
    const endLetters = {};
    const allLetters = {};
    const singleWords = {};

    value.forEach(word => {
        const wordLength = word.length;
        if (wordLength >= 2) {
            startLetters[word[0]] = (startLetters[word[0]] || 0) + 1;
            endLetters[word[wordLength - 1]] = (endLetters[word[wordLength - 1]] || 0) + 1;
            allLetters[word[0]] = null;
            allLetters[word[wordLength - 1]] = null;
        }
        else {
            singleWords[word[0]] = (singleWords[word[0]] || 0) + 1;
        }
    });

    return { startLetters, endLetters, allLetters, singleWords };
}

function checkSequenceOfWords(startLetters, endLetters, allLetters, singleWords, totalWordCount) {
    const startLettersCount = Object.keys(startLetters).length;
    const endLettersCount = Object.keys(endLetters).length;
    const bothLetterCountValid = startLettersCount === endLettersCount || startLettersCount - endLettersCount === 1 || endLettersCount - startLettersCount === 1;

    if (bothLetterCountValid) {
        let diffLetters = [];
        for (const char in allLetters) {
            if (startLetters?.hasOwnProperty(char) && endLetters?.hasOwnProperty(char)) {
                const diff = startLetters[char] - endLetters[char];
                if (!(diff === 0 || diff === 1 || diff === -1)) {
                    return false;
                }
            }
            else {
                if (diffLetters.length === 2 || totalWordCount === 2 || startLetters?.hasOwnProperty(char) && startLetters[char] > 1 || endLettersCount?.hasOwnProperty(char) && endLettersCount[char] > 1) return false;
                diffLetters.push(char)
            }
        }
        
        if (Object.keys(singleWords).length > 0) {
            for (const char in singleWords) {
                if (!startLetters?.hasOwnProperty(char) && !endLetters?.hasOwnProperty(char)) {
                    return false;
                }
            }
        }

        return true;
    }
    return false;
}

function playOnWordsOpenDoor(value, expect) {
    const { startLetters, endLetters, allLetters, singleWords } = countStartEndLettersInWords(value);
    if (checkSequenceOfWords(startLetters, endLetters, allLetters, singleWords, value.length)) {
        return console.log("Ordering is possible. OK", expect);
    }
    return console.log("The door cannot be opened. NO", expect);

}

console.log('--OK--')
playOnWordsOpenDoor(['acm', 'malform', 'mouse'], 'ok');
playOnWordsOpenDoor(['acm', 'malform', 'mom'], 'ok');
playOnWordsOpenDoor(['a', 'acm', 'a', 'malform', 'momma'], 'ok');
playOnWordsOpenDoor(['acm', 'malform', 'mi', 'i', 'icberg'], 'ok');
playOnWordsOpenDoor(['acm', 'malform', 'mi', 'i', 'icbergi'], 'ok');
playOnWordsOpenDoor(['mca', 'alform', 'mi', 'a', 'a', 'a', 'icberg'], 'ok');
playOnWordsOpenDoor(['mcm', 'mlform', 'mi', 'a', 'icberga'], 'ok'); 
playOnWordsOpenDoor(['amcm', 'mlform', 'mi', 'a', 'icberg'], 'ok'); 

console.log('-No--')
playOnWordsOpenDoor(['acm', 'malfori', 'mi', 'i', 'icbergi'], 'no');
playOnWordsOpenDoor(['acm', 'malform', 'mi', 'i', 'acbergi'], 'no');
playOnWordsOpenDoor(['mcm', 'malform', 'mi', 'a', 'icberg'], 'no');
playOnWordsOpenDoor(['mcm', 'q', 'q', 'malform', 'mi', 'a', 'a', 'a', 'icberg'], 'no');
playOnWordsOpenDoor(['kcm', 'malform', 'mi', 'a', 'icberg'], 'no'); 
playOnWordsOpenDoor(['icm', 'malfora', 'mi', 'a', 'icberg'], 'no');
playOnWordsOpenDoor(['acm', 'malform', 'klaus'], 'no');
playOnWordsOpenDoor(['ok', 'ok'], 'no');


/*
Case1
acm
malform
mouse

Start
a - 1
m - 2

End
m - 2
e - 1

Case2
acm
malform
mom

Start
a - 1
m - 2

End
m - 3
e - 1
*/