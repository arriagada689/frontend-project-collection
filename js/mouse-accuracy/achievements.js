const audioButton = document.getElementById('achievements-audio-button')
const lockedNum = document.getElementById('locked-num')
const lockedNum2 = document.getElementById('locked-num-2')
const unlockedTitleDiv = document.getElementById('unlocked-title-div')
const unlockedContainer = document.getElementById('unlocked-container')
const lockedContainer = document.getElementById('locked-container')
const deleteStatsBtn = document.getElementById('delete-stats-btn')
const restartGameBtn = document.getElementById('restart-game-btn')

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

const achievements = JSON.parse(localStorage.getItem('achievements')) || null

if(achievements){
    //Render stats
    const unlockedNum = document.getElementById('unlocked-num')
    const gamesPlayedNum = document.getElementById('games-played-num')
    const bestScoreNum = document.getElementById('best-score-num')
    const unlockedNum2 = document.getElementById('unlocked-num-2')
    
    unlockedNum.textContent = achievements['achievement-array'].length
    lockedNum.textContent = 8 - achievements['achievement-array'].length
    gamesPlayedNum.textContent = achievements['games-played']
    bestScoreNum.textContent = achievements['best-score']
    unlockedNum2.textContent = `(${achievements['achievement-array'].length})`
    lockedNum2.textContent = `(${8 - achievements['achievement-array'].length})`

    //render unlocked cards
    //iterate through array and create card for each with new styling
    achievements['achievement-array'].forEach(achievement => {
        const card = document.createElement('div');
        card.className = "bg-customDark2 rounded-2xl p-3 flex justify-between gap-x-2 shadow-sm shadow-black border-l-4 border-l-green-500 transition-transform duration-200 ease-out hover:translate-x-1";

        card.innerHTML = `
            <div class="flex gap-x-2">
                <span class="text-3xl">${achievement.icon}</span>
                <div class="flex flex-col">
                    <div class="text-white font-semibold text-lg">${achievement.title}</div>
                    <div class="text-gray-400">${achievement.subtitle}</div>
                </div>
            </div>
            <span class="text-green-500 text-lg">✓</span>
        `;
        unlockedContainer.appendChild(card)
    })

    //iterate through locked cards and add hidden to cards already achieved
    for(const card of lockedContainer.children){
        const flag = achievements['achievement-array'].some(achievement => {
            return achievement.title === card.children[0].children[1].children[0].innerText
        })
        if(flag){
            card.classList.add('hidden')
        }
    }

} else { //no achievements unlocked
    unlockedTitleDiv.classList.add('hidden')
    lockedNum.textContent = '8'
    lockedNum2.textContent = '(8)'
}

deleteStatsBtn.addEventListener('click', () => {
    const confirmed = window.confirm("Are you sure you want to delete your stats?")
    if(confirmed){
        localStorage.removeItem('achievements')
    }
    location.reload()
})

restartGameBtn.addEventListener('click', () => {
    localStorage.setItem('play', 'true')
    window.location.href = "/mouse-accuracy.html"
})