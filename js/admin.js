const $inputs = document.querySelectorAll('input');
const $question = document.querySelector('.question');
const $submit = document.querySelector('.submit');
const $themes = document.querySelector('#themes');
const $rightAnswer = document.querySelector('#rightAnswer');

window.addEventListener('load', () => {
    const themes = JSON.parse(localStorage.getItem('themes'))
    const allThemes = themes.map(item => {
        return `
            <option value="${item}">${item}</option>
        `
    })
    $themes.innerHTML = allThemes
})

let chosenTheme = 'math'
let rightAnswer = 'a'

$themes.addEventListener('change', e => {
    const val = e.target.value
    chosenTheme = val
    console.log(chosenTheme);
})

$rightAnswer.addEventListener('change', e => {
    const val = e.target.value
    rightAnswer = val
    console.log(rightAnswer);
})

$submit.addEventListener('click', e => {
    e.preventDefault()
    const database = JSON.parse(localStorage.getItem('quizData'))
    const question = newQuestion()
    if (question) {
        database[chosenTheme].push(question)
        localStorage.setItem('quizData', JSON.stringify(database))
    } else {
        alert('Fill the area!')
    }
})

function newQuestion(){
    let obj = {}
    let areAllInputsFilledUp = true
    $inputs.forEach(({id, value}) => {
        if (value) {
            obj[id] = value
        }else{
            areAllInputsFilledUp = false
        }
    })
    
    if (areAllInputsFilledUp && $question.value) {
        obj.question = $question.value
        obj.correct = $rightAnswer.value
        return obj
    }else{
        console.error('Error!')
    }
}