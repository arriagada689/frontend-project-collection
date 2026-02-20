const playArea = document.getElementById('play-area')

const difficulty = 690, size = 'h-[67px] w-[67px]', color = 'bg-red-500 hover:bg-red-400'

let playAreaHeight, playAreaWidth
let targetCount = 0

playArea.addEventListener('mousedown', (e) => {
    e.preventDefault()
    const clickX = e.clientX - playArea.getBoundingClientRect().left;
    const clickY = e.clientY - playArea.getBoundingClientRect().top;
    const hitmarker = document.createElement('i');
    hitmarker.className = `fa-solid fa-x absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 text-sm text-red-500`;
    hitmarker.style.left = `${clickX}px`;
    hitmarker.style.top = `${clickY}px`;
    playArea.appendChild(hitmarker);
    setTimeout(() => {
        hitmarker.classList.add('opacity-0');
        setTimeout(() => hitmarker.remove(), 800);
    }, 500);
})

function loadTargets() {
    for(let i = 0; i < 5; i++){
        addTarget()
    }
}
loadTargets()

function addTarget(){
    //create target
    const target = document.createElement('div')
    target.className = `${size} rounded-full ${color}`

    // Generate random positions for the target
    playAreaHeight = playArea.getBoundingClientRect().height;
    playAreaWidth = playArea.getBoundingClientRect().width;
    const randomY = randomInteger(1, playAreaHeight - 80)
    const randomX = randomInteger(1, playAreaWidth - 80)
    target.style.position = 'absolute';
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;

    target.addEventListener('mousedown', (e) => {
        e.stopPropagation()

        // Disable further clicks on this target
        target.style.pointerEvents = 'none';

        //give red outline
        const colorClasses = color.split(' ')
        target.classList.remove(...colorClasses)
        target.classList.add('outline', 'outline-red-500', 'opacity-100')
        //fade out
        target.style.transition = 'opacity 0.5s ease';
        target.style.opacity = '0';

        //add another target
        addTarget()

        setTimeout(() => {
            target.remove();
        }, 500);
    })

    playArea.appendChild(target)
    targetCount++
}

window.addEventListener('resize', () => {
    //clear current targets
    playArea.innerHTML = ''
    //load more targets with new height and width
    loadTargets()
})

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}