'use strict';

let userNum = "";
let endpoint = "";

function onSubmit() {
    $(`.js-submit`).click(event => {
        event.preventDefault();
        clearValues();
        submittedNumber();
        fetchDogs();
    });
}

// captures number submitted/defaults to 3
function submittedNumber() {
    userNum = $('.js-number').val();
    // change empty submission to 3
    if (userNum == "") {
        userNum = 3;
    }
    endpoint = "https://dog.ceo/api/breeds/image/random/" + userNum;
}

//retrieves dog images from API
function fetchDogs() {
    fetch(`${endpoint}`)
        .then(response => response.json())
        .then(responseJson => displayDog(responseJson))
        .catch(error => {
            console.log(error);
            alert('Something went wrong, check console.');
        });

}

// appends dog image from the API into html
function displayDog(responseJson) {
    console.log(responseJson);
    for (let i = 0; i < responseJson.message.length; i++) {
        $(`.js-dogs`).append(`<img src="${responseJson.message[i]}" class="col-3 results-img">`);
    }
}

// refresh page/values
function clearValues() {
    userNum = "";
    endpoint = "";
    $(`.js-dogs`).html("");
}

$(onSubmit);