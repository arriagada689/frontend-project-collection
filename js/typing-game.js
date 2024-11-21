import { dictionarySet, numberSet, repeatingSet } from "./data/typingDictionarySet.js"
import getQueryParams from "./utils/getQueryParams.js"

const mainDiv = document.getElementById('main-div')
const words = document.getElementById('words')
const startButton = document.getElementById('start-btn')
const startDiv = document.getElementById('start-div')
const input = document.getElementById('user-input')
const wpm = document.getElementById('wpm')
const progressBar = document.getElementById('progress-bar')
const goBackButton = document.getElementById('go-back-btn')
const doneText = document.getElementById('done-text')
const tryAgainButton = document.getElementById('try-again-btn')
const newGameButton = document.getElementById('new-game-btn')
const startIndicator = document.getElementById('start-indicator');
const startIndicator2 = document.getElementById('start-indicator2');
const menuButtons = document.querySelectorAll('#menu-btn')
const navbar = document.getElementById('navbar')

let wordStr
let wordsArray
let currentIndex = 0 //used to compare with wordStr
let bound = 0
let currentWordIndex = 0 //used to grab the letter to change the color or bg color
let wrongCounter = 0
let tempIndex = 0 //used to grab the letter element with a word element
let started = false
let seconds = 0;

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

input.addEventListener('keydown', (e) => {
    const currentKey = e.key;
    const validKeyPattern = /^[a-zA-Z0-9 .,?!'";:-]$/;
    if(currentKey && validKeyPattern.test(currentKey)){
        startIndicator.classList.add('hidden')
        startIndicator2.classList.add('hidden')
    }
})

input.addEventListener('keydown', (e) => {
    const currentKey = e.key;
    const validKeyPattern = /^[a-zA-Z0-9 .,?!'";:-]$/;

    // console.log(currentIndex, tempIndex, currentWordIndex, wrongCounter)

    // Ignore keys that do not match the valid pattern
    if (!validKeyPattern.test(currentKey) && currentKey !== 'Backspace' && currentKey !== ' ') {
        return;
    }
    
    if(currentKey === ' '){
        e.preventDefault();
        const expectedChar = wordStr[currentIndex];
        if(currentIndex === 0){
            return
        }
        if(wrongCounter === 0 && currentKey === expectedChar){
            currentIndex++
            currentWordIndex += 2
            bound = currentIndex
            input.value = ''
            tempIndex = 0
            handleBar(currentWordIndex - 1, null)
        } else if(wrongCounter > 0 || currentKey !== expectedChar){

        }
        
    } else if(currentKey === 'Backspace'){
        //handle when first index of word
        if(currentIndex === bound){
            return
        }

        if(wrongCounter > 0 && wordStr[currentIndex - 1] === ' '){
            words.children[currentWordIndex - 1].classList.remove('text-green-500')
            words.children[currentWordIndex - 1].classList.remove('bg-red-500')
            currentWordIndex -= 2
            tempIndex = words.children[currentWordIndex].textContent.length
            currentIndex--
            wrongCounter--
        } else if(wrongCounter > 0){
            words.children[currentWordIndex].children[tempIndex - 1].classList.remove('text-green-500')
            words.children[currentWordIndex].children[tempIndex - 1].classList.remove('bg-red-500')
            currentIndex--
            tempIndex--
            wrongCounter--
        } else { //deleting a correct letter
            words.children[currentWordIndex].children[tempIndex - 1].classList.remove('text-green-500')
            words.children[currentWordIndex].children[tempIndex - 1].classList.remove('bg-red-500')
            currentIndex--
            tempIndex--
        }
        handleBar(currentWordIndex, tempIndex)
        
    } else if(wrongCounter === 0 && currentKey === wordStr[currentIndex]){
        //make letter green
        words.children[currentWordIndex].children[tempIndex].classList.add('text-green-500')

        //if done
        if(currentIndex === wordStr.length - 1){
            currentIndex++
            tempIndex++
            endGame()
            return
        }
        
        currentIndex++
        tempIndex++
        handleBar(currentWordIndex, tempIndex)
    } else if( wrongCounter > 0 || currentKey !== wordStr[currentIndex]){
        if(wordStr[currentIndex] === ' '){
            currentWordIndex += 2
            tempIndex = 0
            currentIndex++
            wrongCounter++
            words.children[currentWordIndex - 1].classList.add('bg-red-500')
            handleBar(currentWordIndex, tempIndex)
            return
        } else {
            words.children[currentWordIndex].children[tempIndex].classList.add('bg-red-500')
            wrongCounter++
            currentIndex++
            tempIndex++
        }
        handleBar(currentWordIndex, tempIndex)
    }
})

input.addEventListener('keydown', () => {
    if(wrongCounter > 0){
        input.classList.remove('dark:bg-gray-800')
        input.classList.add('bg-red-500')
    } else {
        if(localStorage.theme === 'dark'){
            input.classList.add('dark:bg-gray-800')
        }
        input.classList.remove('bg-red-500')
    }
})

let wpmInterval = setInterval(() => {
    if(started){
        const minutes = seconds / 60;
        const netWPM = ((currentIndex - wrongCounter) / 5) / minutes
        wpm.textContent = netWPM ? Math.round(netWPM) + ' wpm' : '0 wpm'

        //update progress bar
        const progress = (currentIndex / wordStr.length) * 100;
        progressBar.style.width = `${progress}%`
    }
}, 2000)

startButton.addEventListener('click', () => {

    //grab query params to see gamemode and set word str
    const queryParams = getQueryParams()
    if(localStorage.getItem('wordString')){
        wordStr = localStorage.getItem('wordString')
        localStorage.removeItem('wordString');
        wordsArray = wordStr.split(' ')
    } else if(!queryParams.gamemode){
        wordStr = dictionarySet[Math.floor(Math.random() * dictionarySet.length)]
        wordsArray = wordStr.split(' ')
    } else if(queryParams.gamemode === 'numbers'){
        wordStr = numberSet[Math.floor(Math.random() * numberSet.length)]
        wordsArray = wordStr.split(' ')
    } else if(queryParams.gamemode === 'repeating'){
        wordStr = repeatingSet[Math.floor(Math.random() * repeatingSet.length)]
        wordsArray = wordStr.split(' ')
    }
    createWordElements()

    startDiv.classList.add('hidden')
    mainDiv.classList.remove('hidden')
    mainDiv.classList.add('flex')
    started = true
    input.focus()

    //handle initial bar positioning
    handleBar(0, 0)

    animateArrow()

    // Start the timer
    setInterval(() => {
        seconds++;
    }, 1000);
})

goBackButton.addEventListener('click', () => {
    window.location.href = window.location.href
})

function endGame(){
    clearInterval(wpmInterval)
    const minutes = seconds / 60;
    const netWPM = ((currentIndex - wrongCounter) / 5) / minutes
    wpm.textContent = netWPM ? Math.round(netWPM) + ' wpm' : '0 wpm'
    const progress = (currentIndex / wordStr.length) * 100;
    progressBar.style.width = `${progress}%`
    input.classList.add('hidden')
    const existingBar = document.querySelector('.caret-bar');
    if (existingBar) {
        existingBar.remove();
    }

    tryAgainButton.classList.remove('hidden')
    newGameButton.classList.remove('hidden')

    //done text
    mainDiv.classList.remove('pt-14')
    // doneText.classList.remove('opacity')
    doneText.classList.add('opacity-100', 'scale-100');
}

function handleBar(wordIndex, innerIndex){
    // Remove any existing bar
    const existingBar = document.querySelector('.caret-bar');
    if (existingBar) {
        existingBar.remove();
    }

    //create the new bar and position it
    const bar = document.createElement('div')

    if(!words.children[wordIndex].children[innerIndex]){
        const letterElement = words.children[wordIndex + 1]
        letterElement.classList.add('relative')
        letterElement.appendChild(bar)
        bar.className = 'absolute h-[28px] w-[2px] bg-black left-0 top-0 caret-bar'
        bar.style.left = '-1px';
    } else {
        const letterElement = words.children[wordIndex].children[innerIndex]
        letterElement.classList.add('relative')
        letterElement.appendChild(bar)
        bar.className = 'absolute h-[28px] w-[2px] bg-black left-0 top-0 caret-bar'
        bar.style.left = '-1px';
    }
}

newGameButton.addEventListener('click', () => {
    localStorage.setItem('restartGame', 'true');
    window.location.reload()
})

window.addEventListener('load', () => {
    if(localStorage.getItem('restartGame') === 'true') {
        localStorage.removeItem('restartGame');
        
        if (startButton) {
            startButton.click();
        }
    }
})

tryAgainButton.addEventListener('click', () => {
    localStorage.setItem('restartGame', 'true');
    localStorage.setItem('wordString', wordStr);
    window.location.reload()
})

function animateArrow() {
    let scale = 1;
    let growing = true;

    const animationInterval = setInterval(() => {
        if (growing) {
            scale += 0.05;
            if (scale >= 1.5) {
                growing = false;
            }
        } else {
            scale -= 0.05;
            if (scale <= 1) {
                growing = true;
            }
        }

        startIndicator.style.transform = `scale(${scale}) translateX(-100%)`;
        startIndicator2.style.transform = `scale(${scale}) translateX(-100%)`;
    }, 75)
}

const queryParams = getQueryParams()
const icon = document.createElement('i')
icon.className = 'fa-solid fa-check text-5xl'
if(queryParams.gamemode === 'numbers'){
    const initialIcon = menuButtons[1].children[1]
    menuButtons[1].removeChild(initialIcon)
    menuButtons[1].appendChild(icon)
    navbar.classList.remove('bg-orange-400')
    navbar.classList.remove('bg-red-400')
    navbar.classList.add('bg-purple-400')
} else if(queryParams.gamemode === 'repeating'){
    const initialIcon = menuButtons[2].children[1]
    menuButtons[2].removeChild(initialIcon)
    menuButtons[2].appendChild(icon)
    navbar.classList.remove('bg-red-400')
    navbar.classList.remove('bg-purple-400')
    navbar.classList.add('bg-orange-400')
} else if(!queryParams.gamemode) {
    const initialIcon = menuButtons[0].children[1]
    menuButtons[0].removeChild(initialIcon)
    menuButtons[0].appendChild(icon)
    navbar.classList.remove('bg-orange-400')
    navbar.classList.remove('bg-purple-400')
    navbar.classList.add('bg-red-400')
}