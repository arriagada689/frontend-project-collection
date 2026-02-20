//track amount of games played
//track best score
export function updateAchievements(newScore, clickAccuracy, comboStarter, comboMaster, clicks){
    let achievements = JSON.parse(localStorage.getItem('achievements'));

    if (!achievements) {
        achievements = {
            "games-played": 0,
            "best-score": 0,
            "achievement-array": []
        };
    }

    achievements["games-played"] += 1;
    if (newScore > achievements["best-score"]) {
        achievements["best-score"] = newScore;
    }

    if(achievements['games-played'] === 1){
        achievements['achievement-array'].push({"title": "First Steps", "subtitle": "Complete your first game", "icon": "🎯"})
    }

    if(clickAccuracy > 90 && !achievements['achievement-array'].some(achievement => achievement.title === 'Precision')) {
        achievements['achievement-array'].push({"title": "Precision", "subtitle": "Achieve 90% click accuracy", "icon": "🎪"})
    }

    if(clicks >= 10 && clickAccuracy === 100 && !achievements['achievement-array'].some(achievement => achievement.title === 'Perfection')){
        achievements['achievement-array'].push({"title": "Perfection", "subtitle": "Achieve 100% click accuracy (min 10 clicks)", "icon": "⭐"})
    }

    if(newScore >= 100 && !achievements['achievement-array'].some(achievement => achievement.title === 'Century')){
        achievements['achievement-array'].push({'title': 'Century', 'subtitle': 'Score 100 points in a single game', 'icon': '💯'})
    }

    if(newScore >= 500 && !achievements['achievement-array'].some(achievement => achievement.title === 'Sharpshooter')){
        achievements['achievement-array'].push({'title': 'Sharpshooter', 'subtitle': 'Score 500 points in a single game', 'icon': '🎖️'})
    }

    if(comboStarter && !achievements['achievement-array'].some(achievement => achievement.title === 'Combo Starter')){
        achievements['achievement-array'].push({'title': 'Combo Starter', 'subtitle': 'Reach a 10x combo', 'icon': '🔥'})
    }

    if(comboMaster && !achievements['achievement-array'].some(achievement => achievement.title === 'Combo Master')){
        achievements['achievement-array'].push({'title': 'Combo Master', 'subtitle': 'Reach a 25x combo', 'icon': '💥'})
    }

    if(achievements['games-played'] === 100){
        achievements['achievement-array'].push({'title': 'Veteran', 'subtitle': 'Play 100 games', 'icon': '🏆'})
    }

    localStorage.setItem('achievements', JSON.stringify(achievements));
}

export function renderAchievements(newScore, clickAccuracy, comboStarter, comboMaster, clicks, div){
    let stored = JSON.parse(localStorage.getItem("achievements"));
    let achievements = stored?.["achievement-array"] ?? [];
    const gamesPlayed = stored?.['games-played']
    let initialLength = achievements.length
    let newLength = initialLength
    let arr = []

    if(achievements.length === 0){
        arr.push({"title": "First Steps", "subtitle": "Complete your first game", "icon": "🎯"})
        newLength++
    }

    if(clickAccuracy > 90 && !achievements.some(achievement => achievement.title === 'Precision')){
        arr.push({"title": "Precision", "subtitle": "Achieve 90% click accuracy", "icon": "🎪"})
        newLength++
    }

    if(clicks >= 10 && clickAccuracy === 100 && !achievements.some(achievement => achievement.title === 'Perfection')){
        arr.push({"title": "Perfection", "subtitle": "Achieve 100% click accuracy (min 10 clicks)", "icon": "💯"})
        newLength++
    }

    if(newScore >= 100 && !achievements.some(achievement => achievement.title === 'Century')){
        arr.push({'title': 'Century', 'subtitle': 'Score 100 points in a single game', 'icon': '💯'})
        newLength++
    }

    if(newScore >= 500 && !achievements.some(achievement => achievement.title === 'Sharpshooter')){
        arr.push({'title': 'Sharpshooter', 'subtitle': 'Score 500 points in a single game', 'icon': '🎖️'})
        newLength++
    }

    if(comboStarter && !achievements.some(achievement => achievement.title === 'Combo Starter')){
        arr.push({'title': 'Combo Starter', 'subtitle': 'Reach a 10x combo', 'icon': '🔥'})
        newLength++
    }

    if(comboMaster && !achievements.some(achievement => achievement.title === 'Combo Master')){
        arr.push({'title': 'Combo Master', 'subtitle': 'Reach a 25x combo', 'icon': '💥'})
        newLength++
    }

    if(gamesPlayed === 99){
        arr.push({'title': 'Veteran', 'subtitle': 'Play 100 games', 'icon': '🏆'})
        newLength++
    }

    //if new achievements unlocked, display achievements
    if(newLength > initialLength){
        div.classList.remove('hidden')

        arr.forEach(achievement => {
            const card = document.createElement('div');
            card.className = 'flex items-center gap-x-4 p-2 bg-gradient-to-r from-green-950 to-gray-950 rounded-xl'
            card.innerHTML = `
                <span class="text-3xl">${achievement.icon}</span>
                <div class="flex flex-col">
                    <span class="font-bold text-white"}>${achievement.title}</span>
                    <span class="text-gray-400">${achievement.subtitle}</span>
                </div>
            `
            div.children[1].appendChild(card)
        })
    }
}