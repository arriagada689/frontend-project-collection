const difficultyOptions = ['Easy', 'Normal', 'Hard', 'Insane']
const integerDifficultyOptions = [690, 540, 440, 320]
const sizeOptions = ['Tiny', 'Small', 'Medium', 'Large']
const integerSizeOptions = ['h-[24px] w-[24px]', 'h-[48px] w-[48px]', 'h-[67px] w-[67px]', 'h-[75px] w-[75px]']
const durationOptions = ['5 Seconds', '15 Seconds', '30 Seconds', '60 Seconds']
const integerDurationOptions = [5000, 15000, 30000, 60000]

let difficultyIndex = JSON.parse(localStorage.getItem('settings'))?.difficultyIndex ?? 1
let sizeIndex = JSON.parse(localStorage.getItem('settings'))?.sizeIndex ?? 2
let durationIndex = JSON.parse(localStorage.getItem('settings'))?.durationIndex ?? 1
let color = JSON.parse(localStorage.getItem('settings'))?.color ?? 'bg-red-500 hover:bg-red-400'
let outlineColor = JSON.parse(localStorage.getItem('settings'))?.outlineColor ?? 'outline-red-500'
let windowWidth = window.innerWidth 
let windowHeight = window.innerHeight
let score = 0
let time
let totalTargets = 0
let hits = 0
let misses = 0
let endGame = false
let countdownValue = 3
let combo = 0
let maxCombo = 0
let clickAccuracy = 0
let comboStarter = false
let comboMaster = false

const difficultyButtons = document.getElementById('difficulty-buttons')
const difficultyDiv = document.getElementById('difficulty-div')

const handleDifficultyIconChange = (option) => {
    difficultyDiv.innerHTML = ''
    const icon = document.createElement('i')
    if(option === 'Easy'){
        icon.classList.add('fa-solid', 'fa-computer-mouse', 'text-red-500', 'text-2xl')
    } else if(option === 'Normal'){
        icon.classList.add('fa-solid', 'fa-bolt', 'text-red-500', 'text-2xl')
    } else if(option === 'Hard'){
        icon.classList.add('fa-solid', 'fa-biohazard', 'text-red-500', 'text-2xl')
    } else {
        icon.classList.add('fa-solid', 'fa-crown', 'text-red-500', 'text-2xl')
    }
    return icon
}

const sizeSpan = document.getElementById('size-span')
const durationSpan = document.getElementById('duration-span')
const colorButtons = document.getElementById('color-buttons')
const sizeButtons = document.getElementById('size-buttons')
const durationButtons = document.getElementById('duration-buttons')

//set initial settings based on local storage
const icon = handleDifficultyIconChange(difficultyOptions[difficultyIndex])
const difficultyInnerSpan = document.createElement('span')
difficultyInnerSpan.innerText = difficultyOptions[difficultyIndex]
difficultyDiv.appendChild(icon)
difficultyDiv.appendChild(difficultyInnerSpan)
sizeSpan.textContent = sizeOptions[sizeIndex]
durationSpan.textContent = durationOptions[durationIndex]

const handleMenuOptions = (type, index, outlineColor) => {
    const settings = JSON.parse(localStorage.getItem('settings')) || {}
    if(type === 'difficulty'){
        settings.difficultyIndex = index
    } else if(type === 'size'){
        settings.sizeIndex = index
    } else if(type === 'duration'){
        settings.durationIndex = index
    } else if(type === 'color'){
        settings.color = index
        settings.outlineColor = outlineColor
    }
    localStorage.setItem('settings', JSON.stringify(settings))
}

difficultyButtons.children[0].addEventListener('click', () => {
    difficultyIndex--
    if(difficultyIndex === -1){
        difficultyIndex = difficultyOptions.length - 1
    }
    
    const icon = handleDifficultyIconChange(difficultyOptions[difficultyIndex])
    const difficultyInnerSpan = document.createElement('span')
    difficultyInnerSpan.innerText = difficultyOptions[difficultyIndex]
    difficultyDiv.appendChild(icon)
    difficultyDiv.appendChild(difficultyInnerSpan)

    handleMenuOptions('difficulty', difficultyIndex)
})

difficultyButtons.children[1].addEventListener('click', () => {
    difficultyIndex++
    if(difficultyIndex === difficultyOptions.length){
        difficultyIndex = 0
    }
    const icon = handleDifficultyIconChange(difficultyOptions[difficultyIndex])
    const difficultyInnerSpan = document.createElement('span')
    difficultyInnerSpan.innerText = difficultyOptions[difficultyIndex]
    difficultyDiv.appendChild(icon)
    difficultyDiv.appendChild(difficultyInnerSpan)

    handleMenuOptions('difficulty', difficultyIndex)
})

sizeButtons.children[0].addEventListener('click', () => {
    sizeIndex--
    if(sizeIndex === -1){
        sizeIndex = sizeOptions.length - 1
    }
    sizeSpan.textContent = sizeOptions[sizeIndex]

    handleMenuOptions('size', sizeIndex)
})

sizeButtons.children[1].addEventListener('click', () => {
    sizeIndex++
    if(sizeIndex === sizeOptions.length){
        sizeIndex = 0
    }
    sizeSpan.textContent = sizeOptions[sizeIndex]

    handleMenuOptions('size', sizeIndex)
})

durationButtons.children[0].addEventListener('click', () => {
    durationIndex--
    if(durationIndex === -1){
        durationIndex = durationOptions.length - 1
    }
    durationSpan.textContent = durationOptions[durationIndex]

    handleMenuOptions('duration', durationIndex)
})

durationButtons.children[1].addEventListener('click', () => {
    durationIndex++
    if(durationIndex === durationOptions.length){
        durationIndex = 0
    }
    durationSpan.textContent = durationOptions[durationIndex]

    handleMenuOptions('duration', durationIndex)
})

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
        outlineColor = button.dataset.outlineColor

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

        //set local storage
        handleMenuOptions('color', color, outlineColor)
    });
});

const startGameButton = document.getElementById('start-game-btn')
const menuDiv = document.getElementById('menu-div')
const targetArea = document.getElementById('target-area')
const scoreDiv = document.getElementById('score')
const comboDiv = document.getElementById('combo')
const comboNum = document.getElementById('combo-num')
const timeDiv = document.getElementById('time')
const scoreboard = document.getElementById('scoreboard')
const endSessionBtn = document.getElementById('end-session-btn')
const pregameCountdown = document.getElementById('pregame-countdown')
const pregameCountdownNum = document.getElementById('pregame-countdown-num')
const navbar = document.getElementById('navbar')
const achievementLink = document.getElementById('achievement-link')
const comboMasteryBox = document.getElementById('combo-mastery-box')
const comboMasteryNum = document.getElementById('combo-mastery-num')
const achievementsBox = document.getElementById('achievements-box')

const hitSound = new Audio('/audio/hit.mp3')
const missSound = new Audio('/audio/miss.mp3')
const countdownSound = new Audio('/audio/countdown.mp3')
const audioButton = document.getElementById('audio-button')

let targetAreaHeight, targetAreaWidth

//check user's audio setting
const initialAudioSetting = localStorage.getItem('audioSetting')
const audioIcon = document.createElement('i')
initialAudioSetting === 'true' ? audioIcon.classList.add('fa-solid', 'fa-volume-high') : audioIcon.classList.add('fa-solid', 'fa-volume-xmark')
audioButton.appendChild(audioIcon)

//audio setting toggle
audioButton.addEventListener('click', () => {
    const currentSetting = localStorage.getItem('audioSetting') === 'true'
    const newSetting = !currentSetting

    localStorage.setItem('audioSetting', newSetting)

    //update icon
    audioButton.replaceChildren()
    const audioIcon = document.createElement('i')
    newSetting ? audioIcon.classList.add('fa-solid', 'fa-volume-high') : audioIcon.classList.add('fa-solid', 'fa-volume-xmark')   
    audioButton.appendChild(audioIcon)
})

function createCircle() {
    const circle = document.createElement('div');
    circle.className = 'countdown-circle';
    pregameCountdown.appendChild(circle);

    // Remove after animation completes
    setTimeout(() => circle.remove(), 1000);
}

const countdownIcon = document.getElementById('countdown-icon')
function animateIcon() {
    countdownIcon.classList.remove('icon-pulse');
    void countdownIcon.offsetWidth;
    countdownIcon.classList.add('icon-pulse');
}

import { updateAchievements, renderAchievements } from "./updateAchievements.js"

startGameButton.addEventListener('click', () => {
    
    //pre game countdown
    pregameCountdown.classList.remove('hidden')
    pregameCountdown.classList.add('flex')
    menuDiv.classList.add('hidden')
    pregameCountdownNum.innerText = countdownValue

    //countdown audio
    const audioSetting = localStorage.getItem('audioSetting') === 'true'
    audioSetting ? countdownSound.play() : null

    //initial countdown circle and icon animation
    createCircle()
    animateIcon()

    const countdownInterval = setInterval(() => {
        countdownValue--; 
        
        if (countdownValue > 0 && !endGame) { //continue countdown
            pregameCountdownNum.innerText = countdownValue
            createCircle()
            animateIcon()
        } else { //start the game
            clearInterval(countdownInterval); 
            pregameCountdown.classList.add('hidden');

            endGame = false
            
            targetArea.classList.remove('hidden')

            //handle navbar
            endSessionBtn.classList.remove('hidden')
            achievementLink.replaceWith(endSessionBtn)

            //initial time
            time = integerDurationOptions[durationIndex] / 1000
            timeDiv.innerText = time

            //add end session button
            // endSessionBtn.classList.remove('hidden')
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

            //handles miss clicks
            targetArea.addEventListener('mousedown', (e) => {
                e.preventDefault()

                //miss audio
                missSound.currentTime = 0
                const audioSetting = localStorage.getItem('audioSetting') === 'true'
                audioSetting ? missSound.play() : null

                //handle combo reset
                combo = 0
                comboDiv.classList.remove('opacity-100', 'blur-0')
                comboDiv.classList.add('opacity-0', 'blur-sm')
                comboNum.textContent = ''

                misses += 1
                const clickX = e.clientX - targetArea.getBoundingClientRect().left;
                const clickY = e.clientY - targetArea.getBoundingClientRect().top;
                const hitmarker = document.createElement('i');
                hitmarker.className = `fa-solid fa-x absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 text-sm text-${outlineColor.split('-')[1]}-500`;
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

                //handles hit clicks
                target.addEventListener('mousedown', (e) => {
                    e.stopPropagation()

                    //audio
                    hitSound.currentTime = 0
                    const audioSetting = localStorage.getItem('audioSetting') === 'true'
                    audioSetting ? hitSound.play() : null

                    // Disable further clicks on this target
                    target.style.pointerEvents = 'none';

                    //give color outline
                    const colorClasses = color.split(' ')
                    target.classList.remove(...colorClasses)
                    target.classList.add('outline', outlineColor, 'opacity-100')
                    //fade out
                    target.style.transition = 'opacity 0.5s ease';
                    target.style.opacity = '0';

                    setTimeout(() => {
                        target.remove();
                    }, 500);
                    score += 2
                    scoreDiv.textContent = score
                    hits += 1

                    //handle combo
                    combo += 1
                    if(combo > maxCombo) maxCombo = combo
                    if(combo >= 3){
                        //display combo
                        comboDiv.classList.remove('opacity-0', 'blur-sm')
                        comboDiv.classList.add('opacity-100', 'blur-0')
                        comboNum.textContent = combo
                    }
                    if(combo === 10) comboStarter = true
                    if(combo === 25) comboMaster = true
                })

                targetArea.appendChild(target)
                totalTargets += 1
            }, integerDifficultyOptions[difficultyIndex])

            setTimeout(() => {
                if(!endGame){
                    clearInterval(intervalId);
                    handleEndGame(score)
                    renderAchievements(score, clickAccuracy, comboStarter, comboMaster, (hits + misses), achievementsBox)
                    updateAchievements(score, clickAccuracy, comboStarter, comboMaster, (hits + misses))
                    handleComboMastery()
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
const totalScoreBreakdown = document.getElementById('total-score-breakdown')
const efficiencyPercentage = document.getElementById('efficiency-percentage')
const efficiencyRatio = document.getElementById('efficiency-ratio')
const accuracyPercentage = document.getElementById('accuracy-percentage')
const accuracyRatio = document.getElementById('accuracy-ratio')
const targets = document.getElementById('targets')
const targetsSubLabel = document.getElementById('targets-sub-label')
const clicks = document.getElementById('clicks')
const clicksSubLabel = document.getElementById('clicks-sub-label')
const restartGameButton = document.getElementById('restart-game-btn')

const difficultySpan = document.getElementById('difficulty-span')
const targetSizeSpan = document.getElementById('target-size-span')
const durationResultsSpan = document.getElementById('duration-results-span')

function handleEndGame(){
    endGame = true
    targetArea.classList.add('hidden')
    endSessionBtn.classList.add('hidden')
    scoreboard.classList.remove('hidden')
    endSessionBtn.replaceWith(achievementLink)

    //handle settings
    difficultySpan.innerText = difficultyOptions[difficultyIndex]
    targetSizeSpan.innerText = sizeOptions[sizeIndex]
    durationResultsSpan.innerText = durationOptions[durationIndex]

    totalScore.innerText = score
    totalScoreBreakdown.innerText = `${hits} pts + ${hits} bonus`

    efficiencyPercentage.innerText = (hits === 0 && totalTargets === 0) ? '0%' : Math.round((hits / totalTargets) * 100) + '%';
    efficiencyRatio.innerText = hits + '/' + totalTargets + ' targets hit'

    accuracyPercentage.innerText = (hits + misses) > 0 ? Math.round((hits / (hits + misses)) * 100) + '%' : '0%';
    accuracyRatio.innerText = hits + '/' + (hits + misses) + ' clicks'
    clickAccuracy = Math.round((hits / (hits + misses)) * 100)

    targets.innerText = totalTargets
    const targetsPerSecond = totalTargets / (integerDurationOptions[durationIndex] / 1000)
    targetsSubLabel.innerText = `${hits} hits - ${totalTargets - hits} misses - ${targetsPerSecond.toFixed(1)}/sec`

    clicks.innerText = hits + misses
    const clicksPerSecond = (hits + misses) / (integerDurationOptions[durationIndex] / 1000)
    clicksSubLabel.innerText = `${hits} hits - ${misses} misses - ${clicksPerSecond.toFixed(1)}/sec`
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
    const clicks = hits + misses
    renderAchievements(score, clickAccuracy, comboStarter, comboMaster, clicks, achievementsBox)
    updateAchievements(score, clickAccuracy, comboStarter, comboMaster, clicks)
    handleComboMastery()
})

const handleComboMastery = () => {
    if(maxCombo >= 3){
        comboMasteryBox.classList.remove('hidden')
        comboMasteryNum.innerText = maxCombo
    }
}

//start game from achievement page
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("play") === "true") {
        localStorage.removeItem("play");
        startGameButton.click();
    }
});