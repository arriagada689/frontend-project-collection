const darkModeToggle = document.getElementById('dark-mode-toggle')
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    // Set theme in localStorage if it doesn't exist but system prefers dark mode
    if (!localStorage.theme) {
        localStorage.setItem('theme', 'dark');
    }
    
    document.documentElement.classList.add('dark')

    //add sun icon
    const sunIcon = document.createElement('i')
    sunIcon.className = 'fa-solid fa-sun text-2xl'
    darkModeToggle.appendChild(sunIcon)
} else {
    document.documentElement.classList.remove('dark')
    const moonIcon = document.createElement('i')
    moonIcon.className = 'fa-solid fa-moon text-2xl'
    darkModeToggle.appendChild(moonIcon)
}

darkModeToggle.addEventListener('click', () => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    if(isDarkMode){
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        darkModeToggle.innerHTML = ''; 
        const moonIcon = document.createElement('i');
        moonIcon.className = 'fa-solid fa-moon text-2xl';
        darkModeToggle.appendChild(moonIcon);
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        darkModeToggle.innerHTML = '';
        const sunIcon = document.createElement('i');
        sunIcon.className = 'fa-solid fa-sun text-2xl';
        darkModeToggle.appendChild(sunIcon);
    }
})