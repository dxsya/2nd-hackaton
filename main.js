let APIphotos = 'http://localhost:8000/photos';
let APIhighlights = 'http://localhost:8000/highlights';

//! highlights
let highlightDialog = document.querySelector('#highlight-add');
let highlightBtn = document.querySelector('.highlight-button');
let highlightsList = document.querySelector('.highlights');
let highlightUrl = document.querySelector('#highlight-url');

let cancelButton = document.getElementById('cancel');
let addHighlight = document.getElementById('highlightAdd');

highlightBtn.addEventListener('click', function () {
    highlightDialog.showModal();
});

cancelButton.addEventListener('click', function () {
    highlightDialog.close();
});

highlightBtn.addEventListener('click', async function () {
    let newHighlight = {
        url: highlightUrl.value,
    };
    await fetch(APIhighlights, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(newHighlight),
    });
    addHighlightRender();
});

async function addHighlightRender() {
    let highlights = await fetch(APIhighlights).then((res) => res.json());
    highlights.forEach((element) => {
        let highlight = document.createElement('div');
        highlightsList.innerHTML = `<div class="highlight-item"><img src=${element.value}></div>`;
        highlightsList.prepend(highlight);
    });
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
    photosList.innerHTML = '';
    photos.forEach((element) => {
        photosList.innerHTML += `<div class="photo-item" id='${element.id}'><div><img src=${element.photo}></div>
        <div><p>${element.likes}</p><p>${element.comments}</p><p>${element.views}</p></div>
        <div class="card-buttons">
                        <button id=${element.id} class="photo-edit">Edit</button>
                        <button id=${element.id} onclick='deleteContact(${element.id})'>Delete</button>
        </div></div>`;
    });
}

render();

// TODO DELETE PHOTO

function deleteContact(id) {
    fetch(`${APIphotos}/${id}`, { method: 'DELETE' }).then(() => render());
}

// TODO EDIT PHOTOS

// edit photo inputs

let editDialog = document.getElementById('photo-edit');

let likeEditInp = document.querySelector('#editLikes');
let commentEditInp = document.querySelector('#editComments');
let viewsEditInp = document.querySelector('#editViews');
let photoEditInp = document.querySelector('#editPhoto');

let photoEditBtn = document.querySelector('#photo-edit-btn');
console.log(photoEditBtn);

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('photo-edit')) {
        editDialog.showModal();
        let id = e.target.id;
        fetch(`${APIphotos}/${id}`).then((res) =>
            res.json().then((data) => {
                likeEditInp.value = data.likes;
                commentEditInp.value = data.comments;
                viewsEditInp.value = data.views;
                photoEditInp.value = data.photo;
                photoEditBtn.setAttribute('id', data.id);
            })
        );
    }
});

photoEditBtn.addEventListener('click', function () {
    let id = this.id;
    let likes = likeEditInp.value;
    let photo = photoEditInp.value;
    let comments = commentEditInp.value;
    let views = viewsEditInp.value;

    let editedPhoto = {
        likes: likes,
        photo: photo,
        comments: comments,
        views: views,
    };
    editPhoto(editedPhoto, id);
});

function editPhoto(editedPhoto, id) {
    fetch(`${APIphotos}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json; carset=utf-8' },
        body: JSON.stringify(editedPhoto),
    }).then(() => render());
    editDialog.close();
}
