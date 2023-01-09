const $email = document.querySelector('.email');
const $password = document.querySelector('.password');
const $signIn = document.querySelector('.signIn');
const $error = document.querySelector('.error');

window.addEventListener('load', () => {
    if(!localStorage.getItem('auth')){
        localStorage.setItem('auth', false)
    }else{
        if(localStorage.getItem('auth') === 'true'){
            window.open('index.html', '_self')
        }
    }
})

$signIn.addEventListener('click', e => {
    e.preventDefault()
    if($email.value === 'admin' && $password.value === 'admin'){
        $email.style.borderColor = null
        $password.style.borderColor = null
        $error.innerHTML = 'Вы успешно авторизовались!'
        $error.classList.remove('red')
        $error.classList.add('green')
        localStorage.setItem('auth', true)
        window.open('index.html', '_self')
    }else{
        $email.style.borderColor = 'red'
        $password.style.borderColor = 'red'
        $error.innerHTML = 'Заполните пропуски!'
        $error.classList.add('red')
        $email.value = ''
        $password.value = ''
    }
})