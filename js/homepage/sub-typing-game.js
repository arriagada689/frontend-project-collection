//move caret bar

const inputBox = document.getElementById('input-box');
const words = document.getElementById('words');
const keyboard = document.getElementById('keyboard');

let wordStr = 'Hello and welcome to the typing game!'
let index = 0
let wordsArray
let currentWordIndex = 0
let tempIndex = 0
let keyboardArr = [' ', '1 !', '', '', '', '', '', '', '', '', '', '', '', 'empty',
                   'empty', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '', '', '',
                   'empty', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '', '', 'empty',
                   'triple', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '', '', '', 'empty', 
                   'em', 'em', 'em', 'em', 'Space']

createWordElements()
createKeyboard()

let animationInterval = setInterval(() => {

    //get rid of green bg color
    Array.from(keyboard.children).forEach(key => {
        if(key.innerText || key.id === 'space'){
            key.classList.remove('bg-green-500')
            key.classList.add('bg-white')
        }
    })
    
    if(tempIndex === words.children[currentWordIndex].innerText.length){
        inputBox.innerText = ' '
        currentWordIndex += 2
        tempIndex = 0

        //space button bg color
        const spaceKey = document.getElementById('space')
        spaceKey.classList.remove('bg-white')
        spaceKey.classList.add('bg-green-500')

    } else {
        
        inputBox.innerText += wordStr[index]
        words.children[currentWordIndex].children[tempIndex].classList.add('text-green-500')

        //iterate through keyboard divs and match with clicked key
        Array.from(keyboard.children).forEach(key => {
            if(key.textContent === wordStr[index].toUpperCase()){
                
                key.classList.remove('bg-white')
                key.classList.add('bg-green-500')
            } else if(wordStr[index] === '!'){
                const oneKey = document.getElementById('one')
                oneKey.classList.remove('bg-white')
                oneKey.classList.add('bg-green-500')
            }
        })

        tempIndex++

    }
    
    //handle reset
    if(index === wordStr.length){
        handleAnimationReset()
    } else {
        index++
    }
    
}, 180)

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
    inputBox.innerText = ' '
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

function createKeyboard() {
    
    keyboardArr.forEach(key => {
        const keyDiv = document.createElement('div')
        keyDiv.textContent = key === 'empty' || key === 'em' || key === 'triple' ? '' : key
        keyDiv.className = 'bg-white p-1 text-center rounded ';

        //set col span for big keys
        if(key === 'back' || key === 'Tab' || key === 'Caps' || key === 'Enter' || key === 'empty'){
            keyDiv.classList.add('col-span-2')
        } else if(key === 'triple'){
            keyDiv.classList.add('col-span-3')
        } else if(key === 'Space'){
            keyDiv.textContent = ''
            keyDiv.classList.add('col-span-7')
            keyDiv.id = 'space'
        }

        //empty keys
        if(key === 'em'){
            keyDiv.classList.remove('bg-white')
            keyDiv.classList.add('bg-gray-300')
        }

        //add id to 1 key
        if(key === '1 !'){
            keyDiv.id = 'one'
        }

        keyboard.appendChild(keyDiv);
    })
}

