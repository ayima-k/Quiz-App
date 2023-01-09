const container = document.querySelector('.container');
const $add = document.querySelector('.add');
const $addQuestions = document.querySelector('.addQuestions');

const themes = ['math', 'bio', 'english']

window.addEventListener('load', () => {
    const allThemes = JSON.parse(localStorage.getItem('themes'))
    if(allThemes){
        themeTemplate(allThemes)
    }else{
        localStorage.setItem('themes', JSON.stringify(themes))
    }
})

$add.addEventListener('click', e => {
    e.preventDefault()
    const allThemes = JSON.parse(localStorage.getItem('themes'))
    const newTheme = prompt('Name of theme')
    const themes = [...allThemes, newTheme]
    localStorage.setItem('themes', JSON.stringify(themes))
    window.location.reload()
})

$addQuestions.addEventListener('click', e => {
    e.preventDefault()
    window.open('./admin.html', '_self')
})

function themeTemplate(database){
    const themes = database.map(item => {
        return `
            <div class="theme" id="${item}" onclick="choseTheme('${item}')">
                ${item}
            </div>
        `
    }).join('')
    container.innerHTML = themes
}

function choseTheme(theme){
    localStorage.setItem('theme', JSON.stringify(theme))
    window.open('./index.html', '_self')
}