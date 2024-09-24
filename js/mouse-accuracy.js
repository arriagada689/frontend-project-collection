const difficultyOptions = ['Easy', 'Normal', 'Hard', 'Insane']
const sizeOptions = ['Tiny', 'Small', 'Medium', 'Large']
const durationOptions = ['15 Seconds', '30 Seconds', '60 Seconds']

let difficultyIndex = 1
let sizeIndex = 2
let durationIndex = 1
let color = 'bg-red-500'

const difficultyButtons = document.getElementById('difficulty-buttons')
const difficultySpan = document.getElementById('difficulty-span')
difficultyButtons.children[0].addEventListener('click', () => {
    difficultyIndex--
    if(difficultyIndex === -1){
        difficultyIndex = difficultyOptions.length - 1
    }
    difficultySpan.textContent = difficultyOptions[difficultyIndex]
})

difficultyButtons.children[1].addEventListener('click', () => {
    difficultyIndex++
    if(difficultyIndex === difficultyOptions.length){
        difficultyIndex = 0
    }
    difficultySpan.textContent = difficultyOptions[difficultyIndex]
})

const sizeButtons = document.getElementById('size-buttons')
const sizeSpan = document.getElementById('size-span')
sizeButtons.children[0].addEventListener('click', () => {
    sizeIndex--
    if(sizeIndex === -1){
        sizeIndex = sizeOptions.length - 1
    }
    sizeSpan.textContent = sizeOptions[sizeIndex]
})

sizeButtons.children[1].addEventListener('click', () => {
    sizeIndex++
    if(sizeIndex === sizeOptions.length){
        sizeIndex = 0
    }
    sizeSpan.textContent = sizeOptions[sizeIndex]
})

const durationButtons = document.getElementById('duration-buttons')
const durationSpan = document.getElementById('duration-span')
durationButtons.children[0].addEventListener('click', () => {
    durationIndex--
    if(durationIndex === -1){
        durationIndex = durationOptions.length - 1
    }
    durationSpan.textContent = durationOptions[durationIndex]
})

durationButtons.children[1].addEventListener('click', () => {
    durationIndex++
    if(durationIndex === durationOptions.length){
        durationIndex = 0
    }
    durationSpan.textContent = durationOptions[durationIndex]
})

const colorButtons = document.getElementById('color-buttons')
Array.from(colorButtons.children).forEach((button) => {
    button.addEventListener('click', () => {
        color = button.value
    });
});

const startGameButton = document.getElementById('start-game-btn')
const menuDiv = document.getElementById('menu-div')

startGameButton.addEventListener('click', () => {
    console.log(difficultyOptions[difficultyIndex], sizeOptions[sizeIndex], durationOptions[durationIndex], color);
    menuDiv.classList.add('hidden')
})