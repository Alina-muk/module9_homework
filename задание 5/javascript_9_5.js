// Получаем элементы со страницы
const inputListNumber = document.querySelector('.input_list_number');
const inputLimit = document.querySelector('.input_limit');
const btn = document.querySelector('button');
const span = document.querySelector('span');
const photoDiv = document.querySelector('div');

// Обработчик клика по кнопке
btn.addEventListener ('click', submitBtn);

function submitBtn () {
    const valueListNumber = inputListNumber.value;
    const valueInputLimit = inputLimit.value;
    if (valueListNumber<1 || valueListNumber>10 || isNaN(valueListNumber)) {
        span.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
    } else {
        if (valueInputLimit<1 || valueInputLimit>10 || isNaN(valueInputLimit)) {
            span.innerHTML = 'Лимит страницы вне диапазона от 1 до 10';
        }
    } else {
        if ((valueListNumber<1 || valueListNumber>10 || isNaN(valueListNumber)) && (valueInputLimit<1 || valueInputLimit>10 || isNaN(valueInputLimit))) {
            span.innerHTML = 'номер страницы и лимит вне диапазона от 1 до 10';
        }
    } else {
        fetch ('https://picsum.photos/v2/list?page=$(valueListNumber)&limit=$(valueInputLimit)')
        .then((responce) => response.json())
        .then ((json) => {
            loadPhoto (json);
            savePhotoLocalStorage();
        })
        .catch((reason) => {
            span.innerHTML = 'Ошибка' + reason;
     }); 
    }

}

function loadPhoto (apiData) {
    let cards = String();

    apiData.forEach(item => {
        const cardBlock =     `<div>
                                <img
                                  src="${item.download_url}"
                                  style="width: 150px; margin-right: 30px"
                                />
                                <p>${item.author}</p>
                              </div>`;
        cards += cardBlock;
    });

    photoDiv.innerHTML = cards;
}
function savePhotoToLocalStorage() {
    localStorage.setItem("last_photos", photoDiv.innerHTML);
}

function loadPhotoFromLocalStorage() {
    photoDiv.innerHTML = localStorage.getItem("last_photos");
    return  photoDiv.innerHTML.length > 0;
} 