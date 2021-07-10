
const fs = require('fs');
const readline = require('readline');
const md5 = require("blueimp-md5")
const bitMapArray = new Array(0xffffff, 0);

var text = fs.readFileSync("words.txt").toString('utf-8');
var textByLine = text.split("\n");

textByLine.forEach(word => {
    let index = hashWord(word);
    bitMapArray[index] = 1;
})


const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

enterWord();

function enterWord() {
    reader.question('Enter a word or press CTRL+C to exit: ', (search) => {

        if (checkIfWordExist(search)) {
            console.log(' found the word in the dictionary ');
            enterWord();
        } else {
            console.log('could not find the word. Are you sure you spelled it correctly?');
            enterWord();
        }

    });
}

function hashWord(word) {
    let hash = md5(word);
    let smallerHash = hash.substring(0, 5);
    let index = parseInt(smallerHash, 16);
    return index;

}

function checkIfWordExist(word) {
    let index = hashWord(word);
    if (bitMapArray[index] === 1) {
        return true;
    }
    return false;

}
