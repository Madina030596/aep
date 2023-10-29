//слайдер
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slider').forEach((el) => {
        ItcSlider.getOrCreateInstance(el);
    });
});


//меню
const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
const links = document.querySelectorAll('.header__link');

headerBurger.addEventListener('click', ()=> {
    headerBurger.classList.toggle('active');
    headerMenu.classList.toggle('active');
    document.querySelector('body').classList.toggle('lock'); 
})

links.forEach(function() {
    document.querySelector('body').addEventListener('click', e => {
    if (e.target.closest('.header__link')) {
            headerBurger.classList.remove('active');
            headerMenu.classList.remove('active');
            document.querySelector('body').classList.remove('lock');
        }
    })
})

const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu =  document.querySelector('.dropdown-menu');
const dropdownBtnPhone = document.querySelector('#dropdown-btn-phone');

function dropdownOpenPhoneFunction() {
    dropdownMenu.classList.toggle('dropdown-menu_show_phone');
    dropdownBtnPhone.classList.toggle('dropdown-btn-phone_active');
}

if (document.documentElement.clientWidth < 800) {
    dropdownBtnPhone.addEventListener('click', dropdownOpenPhoneFunction);
    dropdownBtn.addEventListener('click', dropdownOpenPhoneFunction)
} else {
    dropdownBtn.addEventListener('click', ()=>{
        dropdownMenu.classList.toggle('dropdown-menu_show');
    })
}

document.addEventListener('click', menu);
    
    function menu(event) {
        if (event.target === dropdownBtn || event.target === dropdownBtnPhone) {
            return
        } else {
            dropdownMenu.classList.remove('dropdown-menu_show');
            dropdownMenu.classList.remove('dropdown-menu_show_phone');
            dropdownBtnPhone.classList.remove('dropdown-btn-phone_active');
        }
    }

//плавный скролл
const anchors= document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors){
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const blockID = anchor.getAttribute('href');
        document.querySelector(''+ blockID).scrollIntoView({
            behavior:'smooth',
            block:'start'
        })
    })
}

//проверка формы
const reqInputs = document.querySelectorAll('._req');
const emailInput = document.querySelector('._email');
const patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const submitBtn = document.querySelector('#submitBtn');

function validateEmail () {
    if(!emailInput.value.match(patternEmail)) {
        emailInput.classList.add('_error')
    } else {
        emailInput.classList.remove('_error')
    }
}

function checkValidity() {
    reqInputs.forEach(item => {
        if(!item.checkValidity()) {
            item.classList.add('_error')
        } else  {
            item.classList.remove('_error')
        }
    })
    validateEmail()
}

document.querySelectorAll('.form__input').forEach(item => {
    item.addEventListener('keyup', checkValidity)
})

function resetForm() {
    document.querySelector('#form').reset();
}

submitBtn.addEventListener('click', (e)=> {
    window.addEventListener('unload', resetForm)
})

document.addEventListener('click', (e) => {
    if(e.target !== submitBtn) {
        reqInputs.forEach(item => item.classList.remove('_error'))
    } else {
        checkValidity()
    }
})



//отправка формы
const form = document.querySelector('#form');

async function handleSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                text:'Форма успешно отправлена',
                confirmButtonColor: '#c6a085'
            })
            form.reset()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: 'Форма не отправлена!',
                confirmButtonColor: '#c6a085'
            })
        }
    }).catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Форма не отправлена!',
            confirmButtonColor: '#c6a085'
        })
    });
}
form.addEventListener("submit", handleSubmit)


