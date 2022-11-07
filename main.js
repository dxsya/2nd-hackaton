let APIphotos = 'http://localhost:8000/photos';
let APIhighlights = 'http://localhost:8000/highlights';

//! highlights
let highlightDialog = document.querySelector('#highlight-add');
let highlightBtn = document.querySelector('.highlight-button');
let highlights = document.querySelector('.highlights');
let highlightUrl = document.querySelector('#highlight-url');

let cancelButton = document.getElementById('cancel');
let addHighlight = document.getElementById('highlightAdd');

highlightBtn.addEventListener('click', function () {
    highlightDialog.showModal();
});

cancelButton.addEventListener('click', function () {
    highlightDialog.close();
});

addHighlight.addEventListener('click', function () {
    addNewHighlight();
});

async function addNewHighlight() {
    let newHighlight = {
        url: highlightUrl.value,
    };
    let highlight = document.createElement('div');
    highlight.innerHTML = `<div class="highlight-item"><img src=${highlightUrl.value}></div>`;
    highlights.prepend(highlight);
    await fetch(APIhighlights, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(newHighlight),
    });
    highlightUrl.value = '';
}

//TODO RENDER PHOTOS

let addPhotoBtn = document.querySelector('.add-photo');
