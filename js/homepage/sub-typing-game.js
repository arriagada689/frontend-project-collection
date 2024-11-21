//move caret bar

const inputBox = document.getElementById('input-box');
const words = document.getElementById('words');

let wordStr = 'Hello and welcome to the typing game!'
let index = 0
let wordsArray
let currentWordIndex = 0
let tempIndex = 0

let animationInterval = setInterval(() => {

    if(tempIndex === words.children[currentWordIndex].innerText.length){
        inputBox.value = ' '
        currentWordIndex += 2
        tempIndex = 0
    } else {
        //handle reset
        if(index === wordStr.length - 1){
            handleAnimationReset()
        }

        inputBox.value += wordStr[index]
        words.children[currentWordIndex].children[tempIndex].classList.add('text-green-500')
        tempIndex++
    }
    index++
}, 150)

createWordElements()
// console.log(words.children);

function handleAnimationReset(){
    //make all letters normal color
    Array.from(words.children).forEach(word => {
        Array.from(word.children).forEach(letter => {
            letter.className = 'h-full inline-block relative'
        })
    });
    //reset variables
    index = 0
    currentWordIndex = 0
    tempIndex = 0

    //wipe input box
    inputBox.value = ' '
}

function createWordElements(){
    words.innerHTML = ''
    wordsArray = wordStr.split(' ')

    wordsArray.forEach((word, index) => {
        const wordElement = document.createElement('span');
        const spaceElement = document.createElement('span')
        spaceElement.innerHTML = '&nbsp;'
        spaceElement.className = 'h-[28px] w-[7px] inline-block'
        wordElement.className = 'h-[28px] inline-block'
        
        for(const letter of word){
            const letterElement = document.createElement('span')
            letterElement.innerHTML = letter
            letterElement.className = 'h-full inline-block'
            wordElement.appendChild(letterElement)
        }
        
        if(index === wordsArray.length - 1){
            words.appendChild(wordElement); 
        } else {
            words.appendChild(wordElement); 
            words.appendChild(spaceElement); 
        }
    })
}

