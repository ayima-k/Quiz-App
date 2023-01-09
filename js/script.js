const quizData = {
  math:[
    {
      id:1,
      question:'2 + 2',
      a:'4',
      b:'2',
      c:'22',
      d:'Bayel',
      correct:'a'
    },
    {
      id:2,
      question:'Корень 64',
      a:'12',
      b:'8',
      c:'5',
      d:'naruto',
      correct:'b'
    },
    {
      id:3,
      question:'sin30?',
      a:'1',
      b:'0',
      c:'1/2',
      d:'-1',
      correct:'c'
    }
  ],
  bio:[
    {
      id:1,
      question:'How many kingdoms are there in the world?',
      a:'2',
      b:'3',
      c:'4',
      d:'5',
      correct:'d'
    },
    {
      id:2,
      question:'What blood cell curl up the blood at the wound?',
      a:'Trombocite',
      b:'Leikocite',
      c:'Eritrocite',
      d:'Fagocite',
      correct:'a'
    },
    {
      id:3,
      question:'Who is the human?',
      a:'Ruslan',
      b:'Abdullo',
      c:'Aziz',
      d:'Timur',
      correct:'b'
    },
  ],
  english:[
    {
      id:1,
      question:'What is the definition of the apple?',
      a:'Worldwide company',
      b:'Fruit',
      c:'Brand',
      d:'Phone',
      correct:'b'
    },
    {
      id:2,
      question:'Queen of the Great Britain',
      a:'Michael Jordan',
      b:'Josh Bush',
      c:'Elizabeth II',
      d:'Naruto',
      correct:'c'
    },
    {
      id:3,
      question:'-Hello',
      a:'Goodbye',
      b:'Rasengan',
      c:'Apple',
      d:'Hi',
      correct:'d'
    },
  ]
}


const $quizData = document.querySelector('.quizData');
const $question = document.querySelector('.question');
const $answer = document.querySelectorAll('.answer');
const $a_answer = document.querySelector('.a_answer');
const $b_answer = document.querySelector('.b_answer');
const $c_answer = document.querySelector('.c_answer');
const $d_answer = document.querySelector('.d_answer');
const $submitBtn = document.querySelector('.submitBtn');
const $error = document.querySelector('.error');
const $signOut = document.querySelector('.signOut');

let currentQuiz = 0;
let score = 0;
let myAnswer = []

window.addEventListener('load', () => {

  const choosenTheme = localStorage.getItem('themes')
  if (choosenTheme) {
    const dbFormal = localStorage.getItem('quizData')
    if (dbFormal) {
      return
    }else{
      localStorage.setItem('quizData', JSON.stringify(quizData))
      window.location.reload()
    }
  }else{
    window.open('./themes.html', '_self')
  }
})

window.addEventListener('load', () => {
  const auth = localStorage.getItem('auth')
  if(auth === 'false'){
    window.open('auth.html', '_self')
  }
})

const database = JSON.parse(localStorage.getItem('quizData'))
const theme = JSON.parse(localStorage.getItem('theme'))
const localQuizData = database[theme]

$signOut.addEventListener('click', e => {
  e.preventDefault()
  localStorage.setItem('auth', false)
  window.open('./auth.html', '_self')
})

$submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const answer = selectedAnswer()
  if(answer){
    $error.innerHTML = ''
    if (answer === localQuizData[currentQuiz].correct) {
      score++
    }
    myAnswer.push(answer)
    currentQuiz++
    if (currentQuiz < localQuizData.length) {
      loadQuiz()
    }else{
      $quizData.innerHTML = `
        <div class="row">
          <div class="card">
            <h2 class="output">Вы ответили правильно на ${score}/${localQuizData.length}</h2>
            <button onclick="showTrueAnswers()" class="answersBtn">Показать правильные ответы</button>
          </div>
        </div>
      `
    }
  }else{
    $error.innerHTML = 'Выберите один из ответов!'
  }
})

function loadQuiz(){
  deselectRadio()
  const currentQuizData = localQuizData[currentQuiz]
  $question.innerHTML = currentQuizData.question
  $a_answer.innerHTML = currentQuizData.a
  $b_answer.innerHTML = currentQuizData.b
  $c_answer.innerHTML = currentQuizData.c
  $d_answer.innerHTML = currentQuizData.d
}
loadQuiz()

function selectedAnswer(){
  let answer = null
  $answer.forEach(item => {
    if (item.checked) {
      answer = item.id
    } 
  })
  return answer
}

function showTrueAnswers(){
  const template = localQuizData.map((item, index) => {
    return finishedTemplate(item, index)
  }).join('')
  $quizData.innerHTML = template
  $quizData.insertAdjacentHTML('beforebegin', '<h1 class="results">Результаты теста</h1>')
  $quizData.insertAdjacentHTML('beforeend', '<button onclick="resetQuiz()" class="repeatBtn">Начать заново</button>')
  $quizData.insertAdjacentHTML('beforeend', '<button onclick="redirectToThemes()" class="themesBtn">Выбрать тему</button>')
}

function finishedTemplate(item, index){
  return `
    <div class="block">
    <h3>${item.question}</h3>
      <ol>
        <li>${item.a}</li>
        <li>${item.b}</li>
        <li>${item.c}</li>
        <li>${item.d}</li>
        <h4>Правильный ответ: <span class="span">${item.correct}</span></h4>
        <h4>Ваш вариант ответа: <span class="span2">${myAnswer[index]}</span></h4>
      </ol>
    </div>
  `
}

function deselectRadio(){
  $answer.forEach(item => item.checked = false)
}
function resetQuiz(){
  window.location.reload()
}
function redirectToThemes(){
  localStorage.removeItem('theme')
  window.open('./themes.html', '_self')
}
function create(){
  window.open('./admin.html', '_self')
}