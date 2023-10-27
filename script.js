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

//форма отправки
document.addEventListener('DOMContentLoaded', ()=> { //проверка на загруженность документа
    const form = document.querySelector('#form');

    form.addEventListener('submit', formSend); //при отправке формы мы должны перейти в функцию formSend

    async function formSend(e) {
        e.preventDefault(); //запрещаем стандартную отправку формы, то есть при нажатии на кнопку ничего не будет происходить

        let error = formValidate(form);

        let formData = new FormData(form); //вытягиваем все данные полей

        if(error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', { //ждем отправки методом post данных (formData) в файл 'sendmail.php'
                method: 'POST',
                body: formData
            })
            if(response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка');
                form.classList.remove('_sending');
            }
        } else {
            alert('Заполните обязательные поля');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req'); //обязательное поле

        for(let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')) {
                if(emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            }else {
                if(input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error'); //родительскому элементу класс добавляем
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    //функция теста email
    function emailTest(input) {  //регулярным выражением проверяем соответствие (есть ли @ . и тд)
        return !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input.value);
    }
})
