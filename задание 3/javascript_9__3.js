// Получаем элементы со страницы
const inputNumber = document.querySelector('input');
const btn = document.querySelector('button');
const image = document.querySelector('.photos');

// Обработчик клика по кнопке
btn.addEventListener ('click', submitBtn);

function submitBtn () {
    const value = inputNumber.value;
    if (value >=1 && value <=10) {
        useRequest("https://loremflickr.com/320/240?random=" + value, loadPhotos);
        image.innerHTML= 'Фото загружается';
        }
    else {
        image.innerHTML = 'число вне диапазона от 1 до 10';
        }
} 

// Создаем новый объект XMLHttpRequest
function useRequest (url, callback) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
        if (xhr.status !== 200) {
            console.log ("Статус ответа: ", xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
            console.log ("Фото загружены.");
        }
    };
    
    xhr.oneerror = function () {
        console.log ("Ошибка! Статус ответа: ", xhr.status);
    }

    xhr.send();
}
function loadPhotos(apiData) {
    let cards = String();

    apiData.forEach(item => {
        const cardBlock =     `<div>
                                <img
                                  src="${item.download_url}"  
                                />
                                <p>${item.author}</p>
                              </div>`;
        cards += cardBlock;
    });

    photosContainer.innerHTML = cards;
}

