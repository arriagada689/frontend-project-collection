const difficultyOptions = ['Easy', 'Normal', 'Hard', 'Insane']
const integerDifficultyOptions = [690, 540, 440, 320]
const sizeOptions = ['Tiny', 'Small', 'Medium', 'Large']
const integerSizeOptions = ['h-[24px] w-[24px]', 'h-[48px] w-[48px]', 'h-[67px] w-[67px]', 'h-[75px] w-[75px]']
const durationOptions = ['15 Seconds', '30 Seconds', '60 Seconds']
const integerDurationOptions = [15000, 30000, 600000]

let difficultyIndex = 1
let sizeIndex = 2
let durationIndex = 1
let color = 'bg-red-500 hover:bg-red-400'

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
const body = document.body;

startGameButton.addEventListener('click', () => {
    console.log(difficultyOptions[difficultyIndex], sizeOptions[sizeIndex], durationOptions[durationIndex], color);
    menuDiv.classList.add('hidden')

    //start creating targets based on the size, speed, and color
    const intervalId = setInterval(() => {
        const target = document.createElement('div')
        target.className = `${integerSizeOptions[sizeIndex]} rounded-full ${color}`

        // Generate random positions for the target
        const randomX = Math.random() * (window.innerWidth - 50);
        const randomY = Math.random() * (window.innerHeight - 50);
        target.style.position = 'absolute';
        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;

        target.addEventListener('click', () => {
            target.remove()
        })

        body.appendChild(target)
    }, integerDifficultyOptions[difficultyIndex])

    setTimeout(() => {
        clearInterval(intervalId);
    }, integerDurationOptions[durationIndex]);
})