const cursorBtn = document.getElementById('cursor-btn')
const cursorPopup = document.getElementById('cursor-popup');
const cursorPopupBox = document.getElementById('cursor-popup-box');
const closePopup = document.getElementById('close-popup')
const cursorButtons = document.querySelectorAll('[data-cursor]')
const body = document.body;

const cursorObject = {
    'cursor-custom-pointer': ['Default', 'cursor-pointer.png'],
    'cursor-custom-crosshair': ['Crosshair', 'cursor-crosshair.png'],
    'cursor-custom-crosshair-circle': ['Crosshair Circle', 'cursor-crosshair-circle.png'],
    'cursor-custom-pointer-alt': ['Pointer Alternative', 'cursor-pointer-alt.png'],
    'cursor-custom-circle-dot': ['Circle Dot', 'cursor-circle-dot.png'],
    'cursor-custom-dot': ['Dot', 'cursor-dot.png'],
    'cursor-custom-circle': ['Circle', 'cursor-circle.png'],
    'cursor-custom-diamond': ['Diamond', 'cursor-diamond.png']
}

//check local storage for user's chosen cursor
const savedCursor = localStorage.getItem("cursor");
if (savedCursor) {
    setCursor(savedCursor);
}

function setCursor(cursorClass) {
    localStorage.setItem("cursor", cursorClass);
    body.classList.remove(...Object.keys(cursorObject));
    body.classList.add(cursorClass);

    //change highlighted cursor
    cursorButtons.forEach((btn) => {
        if(btn.dataset.cursor === cursorClass){
            btn.classList.remove('hover:outline', 'hover:outline-2', 'hover:outline-gray-500')
            btn.classList.add('outline', 'outline-2', 'outline-red-500')
            const selectedDot = document.createElement('i')
            selectedDot.classList.add('fa-solid', 'fa-circle', 'text-red-500', 'absolute', 'top-0', 'right-0', 'text-xs', 'outline', 'outline-1', 'outline-black', 'rounded-full')
            btn.appendChild(selectedDot)
        } else {
            btn.classList.remove('outline', 'outline-2', 'outline-red-500')
            btn.querySelector('i')?.remove()
        }
    })

    //set the initial display
    cursorBtn.replaceChildren()
    const initialDisplay = document.createElement('div')
    initialDisplay.classList.add('flex', 'items-center', 'gap-x-4')
    const innerImg = document.createElement('img')
    const innerText = document.createElement('div')
    innerText.textContent = cursorObject[cursorClass][0]
    innerText.classList.add('text-gray-100', 'text-lg', 'font-semibold')
    innerImg.src = `/images/cursors/${cursorObject[cursorClass][1]}`
    initialDisplay.appendChild(innerImg)
    initialDisplay.appendChild(innerText)
    cursorBtn.appendChild(initialDisplay)
}

cursorBtn.addEventListener('click', () => {
    //bring up pop up to display cursor options
    cursorPopup.classList.remove('opacity-0', 'pointer-events-none')
    cursorPopup.classList.add('opacity-100', 'pointer-events-auto')

    cursorPopupBox.classList.remove('opacity-0', 'scale-90')
    cursorPopupBox.classList.add('opacity-100', 'scale-100')
})

const closePopupFunc = () => {
    cursorPopup.classList.add('opacity-0', 'pointer-events-none');
    cursorPopup.classList.remove('opacity-100', 'pointer-events-auto');

    cursorPopupBox.classList.add('scale-90');
    cursorPopupBox.classList.remove('scale-100');
}

closePopup.addEventListener('click', closePopupFunc)

cursorPopup.addEventListener('click', (e) => {
    if(e.target === e.currentTarget){
        closePopupFunc()
    }
})

//handle cursor button clicks
cursorButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        setCursor(btn.dataset.cursor)
    })
})