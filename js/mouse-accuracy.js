const difficultyOptions = ['Easy', 'Normal', 'Hard', 'Insane']
const integerDifficultyOptions = [690, 540, 440, 320]
const sizeOptions = ['Tiny', 'Small', 'Medium', 'Large']
const integerSizeOptions = ['h-[24px] w-[24px]', 'h-[48px] w-[48px]', 'h-[67px] w-[67px]', 'h-[75px] w-[75px]']
const durationOptions = ['5 Seconds', '15 Seconds', '30 Seconds', '60 Seconds']
const integerDurationOptions = [5000, 15000, 30000, 60000]

let difficultyIndex = 1
let sizeIndex = 2
let durationIndex = 1
let color = 'bg-red-500 hover:bg-red-400'
let windowWidth = window.innerWidth 
let windowHeight = window.innerHeight
let score = 0
let time
let totalTargets = 0
let hits = 0
let misses = 0
let endGame = false
let countdownValue = 3

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
    //set initial selected circle
    if(button.value === color){
        //create bigger circle outline
        const biggerCircle = document.createElement('div')
        biggerCircle.className = 'absolute border-2 w-[33px] h-[33px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        button.appendChild(biggerCircle)
    }
    button.addEventListener('click', () => {
        color = button.value

        //remove big circle from each
        Array.from(colorButtons.children).forEach((btn) => {
            const bigCircle = btn.querySelector('.border-2');
            if (bigCircle) {
                bigCircle.remove();
            }
        });
        
        // add circle to the clicked circle
        const biggerCircle = document.createElement('div');
        biggerCircle.className = 'absolute border-2 w-[33px] h-[33px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
        button.appendChild(biggerCircle);
    });
});

const startGameButton = document.getElementById('start-game-btn')
const menuDiv = document.getElementById('menu-div')
const targetArea = document.getElementById('target-area')
const scoreDiv = document.getElementById('score')
const timeDiv = document.getElementById('time')
const scoreboard = document.getElementById('scoreboard')
const endSessionBtn = document.getElementById('end-session-btn')
const pregameCountdown = document.getElementById('pregame-countdown')
const navbar = document.getElementById('navbar')

let targetAreaHeight, targetAreaWidth

startGameButton.addEventListener('click', () => {
    //pre game countdown
    pregameCountdown.classList.remove('hidden')
    pregameCountdown.classList.add('flex')
    menuDiv.classList.add('hidden')
    pregameCountdown.innerText = `Starting in ${countdownValue}`

    const countdownInterval = setInterval(() => {
        countdownValue--; 
        
        if (countdownValue > 0) {
            pregameCountdown.innerText = `Starting in ${countdownValue}`;
        } else {
            clearInterval(countdownInterval); 
            pregameCountdown.classList.add('hidden');

            endGame = false
            
            targetArea.classList.remove('hidden')

            //initial time
            time = integerDurationOptions[durationIndex] / 1000
            timeDiv.innerText = time

            //add end session button
            endSessionBtn.classList.remove('hidden')
            navbar.classList.remove('grid-cols-1')
            navbar.classList.add('grid-cols-2')

            //countdown
            const countdown = setInterval(() => {
                if (time > 0) {
                    time--; 
                    timeDiv.innerText = time
                } else {
                    clearInterval(countdown); 
                }
            }, 1000);

            targetArea.addEventListener('click', (e) => {
                e.preventDefault()
                misses += 1
                const clickX = e.clientX - targetArea.getBoundingClientRect().left;
                const clickY = e.clientY - targetArea.getBoundingClientRect().top;
                const hitmarker = document.createElement('i');
                hitmarker.className = `fa-solid fa-x absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 text-sm`;
                hitmarker.style.left = `${clickX}px`;
                hitmarker.style.top = `${clickY}px`;
                targetArea.appendChild(hitmarker);
                setTimeout(() => {
                    hitmarker.classList.add('opacity-0');
                    setTimeout(() => hitmarker.remove(), 800);
                }, 500);
            })

            //start creating targets based on the size, speed, and color
            const intervalId = setInterval(() => {
                const target = document.createElement('div')
                target.className = `${integerSizeOptions[sizeIndex]} rounded-full ${color}`

                // Generate random positions for the target
                targetAreaHeight = targetArea.getBoundingClientRect().height;
                targetAreaWidth = targetArea.getBoundingClientRect().width;
                const randomY = randomInteger(1, targetAreaHeight - 80)
                const randomX = randomInteger(1, targetAreaWidth - 80)
                target.style.position = 'absolute';
                target.style.left = `${randomX}px`;
                target.style.top = `${randomY}px`;

                target.addEventListener('click', (e) => {
                    e.stopPropagation()
                    target.remove()
                    score += 2
                    scoreDiv.textContent = score
                    hits += 1
                })

                targetArea.appendChild(target)
                totalTargets += 1
            }, integerDifficultyOptions[difficultyIndex])

            setTimeout(() => {
                if(!endGame){
                    clearInterval(intervalId);
                    handleEndGame()
                }
            }, integerDurationOptions[durationIndex]);
                }
            }, 1000);
})

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

window.addEventListener('resize', () => {
    targetAreaWidth = targetArea.getBoundingClientRect().width;
    windowHeight = targetArea.getBoundingClientRect().height;
})

const settingsDiv = document.getElementById('settings')
const totalScore = document.getElementById('total-score')
const efficiencyPercentage = document.getElementById('efficiency-percentage')
const efficiencyRatio = document.getElementById('efficiency-ratio')
const accuracyPercentage = document.getElementById('accuracy-percentage')
const accuracyRatio = document.getElementById('accuracy-ratio')
const targets = document.getElementById('targets')
const targetHits = document.getElementById('target-hits')
const targetMisses = document.getElementById('target-misses')
const targetPerSecond = document.getElementById('target-per-second')
const clicks = document.getElementById('clicks')
const clickHits = document.getElementById('click-hits')
const clickMisses = document.getElementById('click-misses')
const clickPerSecond = document.getElementById('click-per-second')
const restartGameButton = document.getElementById('restart-game-btn')

function handleEndGame(){
    endGame = true
    targetArea.classList.add('hidden')
    endSessionBtn.classList.add('hidden')
    scoreboard.classList.remove('hidden')
    navbar.classList.remove('grid-cols-2')
    navbar.classList.add('grid-cols-1')

    //handle settings
    const difficulty = document.createElement('div')
    difficulty.className = 'text-gray-300 font-semibold text-xl'
    difficulty.innerHTML = '<i class="fa-solid fa-chart-simple text-red-500 mr-4 text-2xl"></i>' + difficultyOptions[difficultyIndex]
    const targetSize = document.createElement('div')
    targetSize.className = 'text-gray-300 font-semibold text-xl'
    targetSize.innerHTML = '<i class="fa-regular fa-circle-dot text-red-500 mr-4 text-2xl"></i>' + sizeOptions[sizeIndex]
    const duration = document.createElement('div')
    duration.className = 'text-gray-300 font-semibold text-xl'
    duration.innerHTML = '<i class="fa-solid fa-stopwatch text-red-500 mr-4 text-2xl"></i>' + durationOptions[durationIndex]

    totalScore.innerText = score

    efficiencyPercentage.innerText = Math.round((hits / totalTargets) * 100) + '%';
    efficiencyRatio.innerText = hits + '/' + totalTargets + ' Total'

    accuracyPercentage.innerText = (hits + misses) > 0 ? Math.round((hits / (hits + misses)) * 100) + '%' : '0%';
    accuracyRatio.innerText = hits + '/' + (hits + misses) + ' Total'

    targets.innerText = totalTargets
    targetHits.innerText = hits + ' Hits'
    targetMisses.innerText = (totalTargets - hits) + ' Misses'
    const targetsPerSecond = totalTargets / (integerDurationOptions[durationIndex] / 1000)
    targetPerSecond.innerText = targetsPerSecond.toFixed(1) + ' Per Second'

    clicks.innerText = hits + misses
    clickHits.innerText = hits + ' Hits'
    clickMisses.innerText = misses + ' Misses'
    const clicksPerSecond = (hits + misses) / (integerDurationOptions[durationIndex] / 1000)
    clickPerSecond.innerText = clicksPerSecond.toFixed(1) + ' Per Second'

    settingsDiv.appendChild(difficulty)
    settingsDiv.appendChild(targetSize)
    settingsDiv.appendChild(duration)
}

restartGameButton.addEventListener('click', () => {
    localStorage.setItem('restartGame', 'true')

    const settings = {
        durationIndex: durationIndex,
        difficultyIndex: difficultyIndex,
        sizeIndex: sizeIndex,
        color: color
    };
    localStorage.setItem('settings', JSON.stringify(settings));
    window.location.reload()
})

window.addEventListener('load', () => {
    if(localStorage.getItem('restartGame') === 'true') {
        localStorage.removeItem('restartGame');

        //set variables to the settings in local storage
        const storedSettings = JSON.parse(localStorage.getItem('settings'));

        if(storedSettings){
            durationIndex = storedSettings.durationIndex;
            difficultyIndex = storedSettings.difficultyIndex;
            sizeIndex = storedSettings.sizeIndex;
            color = storedSettings.color;
        }
        
        if (startGameButton) {
            startGameButton.click();
        }
    }
})

endSessionBtn.addEventListener('click', () => {
    handleEndGame()
})