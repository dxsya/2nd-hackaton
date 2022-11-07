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

let showModalAdd = document.querySelector('.create');
let photoDialog = document.querySelector('#photo-add');
let addPhoto = document.querySelector('#photoAdd');
console.log(addPhoto);

// add photo inputs
let likeInp = document.querySelector('#likes');
let commentInp = document.querySelector('#comments');
let viewsInp = document.querySelector('#views');
let photoInp = document.querySelector('#photo');

let cancelButton2 = document.getElementById('cancel2');

let photosList = document.querySelector('.photos');

cancelButton2.addEventListener('click', function () {
    photoDialog.close();
});

showModalAdd.addEventListener('click', function () {
    photoDialog.showModal();
});

addPhoto.addEventListener('click', async function () {
    let newPhoto = {
        photo: photoInp.value,
        likes: likeInp.value,
        comments: commentInp.value,
        views: viewsInp.value,
    };
    await fetch(APIphotos, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(newPhoto),
    });
    photoInp.value = '';
    likeInp.value = '';
    commentInp.value = '';
    viewsInp.value = '';
    render();
});

async function render() {
    let photos = await fetch(APIphotos).then((res) => res.json());
    console.log(photos);
    photosList.innerHTML = '';
    photos.forEach((element) => {
        photosList.innerHTML += `<div class="photo-item" id='${element.id}'><div><img src=${element.photo}></div>
        <div><p>${element.likes}</p><p>${element.comments}</p><p>${element.views}</p></div></div>`;
    });
}

render();
