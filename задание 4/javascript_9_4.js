const valueWidth = document.querySelector('.input_width').value;
const valueHeight = document.querySelector('.input_height').value;
const submit = document.querySelector('button');
const div = document.querySelector('div');

    


const useRequest = function (valueWidth, valueHeight) {
    return fetch ('https://loremflickr.com/json/g/${valueWidth}/${valueHeight}/all')
    .then ((Response) => {
       return Response.json();
    })
    .then((json) => {return json; })
    .catch (() => {console.log ('error')});

};

submit.addEventListener ('click', submitBtn);

function submitBtn() {
    if (valueWidth <100 || valueWidth >300 || valueHeight <100 || valueHeight >300) {
        div.innerHTML = 'число вне диапазона от 100 до 500';
    } else {
        let apiData = await useRequest(valueWidth, valueHeight);
        div.innerHTML = `<img src="${apiData.file}">`;
    }
};

