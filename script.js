// 1. SELECT THE ICONS OF THE HEADER TO CHANGE THEIR APPEARANCE
// 1.1 Arrays with ids of the icons, path of the unselected icons and path of the selected icons
let iconsId = ['iconHome', 'iconMessage', 'iconPost', 'iconTrend', 'iconHeart', 'iconUser']
let icons = ['./img/icons/building-regular.svg', './img/icons/paper-plane-regular.svg', './img/icons/square-plus-regular.svg', './img/icons/compass-regular.svg', './img/icons/heart-regular.svg', './img/icons/circle-user-regular.svg'];
let selectedIcons = ['./img/icons/building-solid.svg', './img/icons/paper-plane-solid.svg', './img/icons/square-plus-solid.svg', './img/icons/compass-solid.svg', './img/icons/heart-solid.svg', './img/icons/circle-user-solid.svg'];
// 1.2 Array of the clickStatus of the icons, at the beginning is always 0 because there aren't selected icons,
// when an icon is selected its value is 1.
let clickStatus = [0, 0, 0, 0, 0, 0];
// 1.3 Return the icons in function of their ClickStatus
function renderIcons(){
    for(let i = 0; i < icons.length; i++){
        let headerBar = document.getElementById('headerBar');
        let id = iconsId[i];
        if(clickStatus[i] == 0){
            headerBar.innerHTML += `
            <img id="${id}" onclick="selectIcon('${id}', ${i}), openDialog()" class="header-icon" src="${icons[i]}">
            `;
        } else {
            headerBar.innerHTML += `
            <img id="${id}" onclick="selectIcon('${id}', ${i}), openDialog()" class="header-icon" src="${selectedIcons[i]}">
            `;
        }
    }
}
// 1.4 Change the appearance of the selected icon. In other words the source is exchange from the array 
// "let icons = [] (That's the array of unselected icons)" to "let unselectedIcons = []" This exchange is obtained through
// the same value of index of the two arrays; 0 for iconHome, 1 for iconMessage, 2 for iconPost, 3 for iconTrend, 4 for iconHeart, 5 for iconUser
function selectIcon(id, i){
    headerBar = document.getElementById('headerBar');
    let click = clickStatus[i];
    let selectedIcon = selectedIcons[i];
    let icon = icons[i];
    if(click == 0){
        clickStatus[i]= 1;
        document.getElementById(id).src = `${selectedIcon}`; 
        renderUnselected(i)
        renderIcons();
    } else {
        document.getElementById(id).src = `${icon}`; 
        clickStatus[i] = 0;
    }
    console.log(clickStatus);
}
function renderUnselected(index){
    for (let i = 0; i < icons.length; i++) {
        let headerBar = document.getElementById('headerBar');
        headerBar.innerHTML = '';
        if (index != i) {
            clickStatus[i] = 0;
        } 
    }
}
// ---------------------------------------------------------
// JSON Objects. The array answers is filled with the comment of the user.
let posts = [
    {
        'logo': './img/stefan.jpg',
        'author': 'Stefan C.',
        'location': 'London',
        'image': './img/london.jpg',
        'description': 'Mein erste Tag in London',
        'comments': {
            'commentAuthor': 'Stefanie Wallas',
            'commentText': 'Ich wunsche dir eine schöne Urlaub!'
        },
        'answers': []
    },
    {   
        'logo': './img/stefanie.jpg',
        'author': 'Stefanie Wallas',
        'location': 'Mercedenz-Benz Arena Berlin',
        'image': './img/concert.jpg',
        'description': 'Ich war am letzten Sonntag in Berlin fürs Konzert von "Blue Sunset". Ich kannte sie nicht, aber jetzt bin ich eine absolute Fan! ',
        'comments': {
            'commentAuthor': '',
            'commentText': ''
        },
        'answers': []
    },
    {   
        'logo': './img/nelson.jpg',
        'author': 'Nelson Smith',
        'location': '',
        'image': './img/auto.jpg',
        'description': 'Who wants try this car? ',
        'comments': {
            'commentAuthor': 'Stefan C.',
            'commentText': 'I prefer BMW'
        },
        'answers': []
    },
    {   
        'logo': './img/christine.jpg',
        'author': 'Christine B.',
        'location': '',
        'image': './img/relax.jpg',
        'description': 'Endlich ein bisschen Relax ',
        'comments': {
            'commentAuthor': '',
            'commentText': ''
        },
        'answers': []
    }
];
load();
// This function show the posts of the website, from the JSON Objects
function show(){
    let postsContainer = document.getElementById('postContainer');
    postsContainer.innerHTML = '';
    for(let i = 0; i < posts.length; i++){
        let bookmarkIcon = 300+i;
        let heartIcon = 200+i;
        let comment = 100+i;            //it gives an unequivocal id to every generated input tag until 100 generated posts, because
        let answerBox = i;              // in the hundredth post also the id of "answerBox" reach the value 100.
        let post = posts[i];            // answerBox is the container where the user add a comment in the post through the function renderAnswer();
        postsContainer.innerHTML += postTemplate(post, heartIcon, bookmarkIcon, answerBox, comment, i);
        
        renderAnswers(i, answerBox);           
    }
}

function postTemplate(post, heartIcon, bookmarkIcon, answerBox, comment, i) {
    return  `
    <div class="post-box">
        <div class="post-author">
            <img src="${post['logo']}">
            <div class="author-text"><h4>${post['author']}</h4><h4 class="text-grey">${post['location']}</h4></div>
        </div>
        <img class="post-image" src="${post['image']}">
        <div class="interaction-box">
            <div class="post-bar">
                <div class ="triad-icon"><img id="${heartIcon}" onclick="selectHeart('${heartIcon}')" class="post-icon" src="./img/icons/heart-regular.svg"><img onclick="openDialog()" class="post-icon" src="./img/icons/comment-regular.svg"><img onclick="openDialog()" class="post-icon" src="./img/icons/paper-plane-regular.svg"></div>
                <div class="single-icon"><img id="${bookmarkIcon}" onclick="selectBookmark('${bookmarkIcon}')" class="post-icon" src="./img/icons/bookmark-regular.svg"></div>
            </div>
            <div class="description-box"><p><b>${post['author']}</b> ${post['description']}</p></div>
            <div class="comment-box"><p><b>${post['comments']['commentAuthor']}</b> ${post['comments']['commentText']}</p></div>
            <div id="${answerBox}" class="answer-box"></div>
            <div class="comment-input">
                <img src="./img/icons/face-smile-regular.svg">
                <input id="${comment}" type="text" placeholder="Kommentieren..."><h4 onclick="addComment('${i}', '${comment}')" class="text-blue">Posten</h4>
            </div>
        </div>
    </div>
    `;
}
// This function add the value of the input tag with, in the empty array let answers = []; This array is inside an object.
// At the end the function show() is activated again. This function generate again the posts, with the modifications.
function addComment(i, comment){
    let text = document.getElementById(comment).value;
    posts[i]['answers'].push(text);
    save();
    show();   
}
// This function generate the comment of the user in the post
function renderAnswers(y, answerBox){
    answerBox = document.getElementById(answerBox);
    answerBox.innerHTML = '';
    for(let i = 0; i < posts[y]['answers'].length; i++){
        answerBox.innerHTML += `
        <p><b>Daniel Pozzan </b>${posts[y]['answers'][i]}</p>
        `;
    }
}
// The function save() saves permanently the array posts, it includes all the posts present in the website.
function save() {
    let postsAsText = JSON.stringify(posts);
    localStorage.setItem('posts', postsAsText);  
}
// the function load() uploads the array posts at the beginning 
function load() {
    let postsAsText = localStorage.getItem('posts');
    if(postsAsText){
        posts = JSON.parse(postsAsText);
    }
}

function openDialog(){
    let dialog = document.getElementById('dialog');
    dialog.classList.remove('d-none');
}

function closeDialog(){
    let dialog = document.getElementById('dialog');
    dialog.classList.add('d-none');
}
// Selection of icons under the post
let heartCount = 0;

function selectHeart(id){
    let heartIcon = document.getElementById(id);
    if (heartCount == 0){
        heartIcon.src = './img/icons/heart-solid.svg';
        heartIcon.style = 'filter: invert(34%) sepia(95%) saturate(5900%) hue-rotate(350deg) brightness(101%) contrast(102%);';
        heartCount++;
    } else {
        heartIcon.src = './img/icons/heart-regular.svg';
        heartIcon.style = 'filter: invert(10%) sepia(12%) saturate(5%) hue-rotate(340deg) brightness(113%) contrast(94%);';
        heartCount--;
    }
}

let bookmarkCount = 0;

function selectBookmark(id){
    let bookmarkIcon = document.getElementById(id);
    if (bookmarkCount == 0){
        bookmarkIcon.src = './img/icons/bookmark-solid.svg';
        bookmarkIcon.style = 'filter: invert(23%) sepia(82%) saturate(5529%) hue-rotate(233deg) brightness(99%) contrast(104%);';
        bookmarkCount++;
    } else {
        bookmarkIcon.src = './img/icons/bookmark-regular.svg';
        bookmarkIcon.style = 'filter: invert(10%) sepia(12%) saturate(5%) hue-rotate(340deg) brightness(113%) contrast(94%);';
        bookmarkCount--;
    }
}

// This script code rend the stories-bar on the left top side 
let contactsImg = ['./img/stefan.jpg', './img/canadian-railways.jpg', './img/nelson.jpg', './img/stefanie.jpg', './img/christine.jpg'];
let contactsName = ['Stefan C.', 'Canadian Railways', 'Nelson Smith', 'Stefanie Wallas', 'Christine B.'];

function renderStories() {
    let storiesBar = document.getElementById('storiesBar');
    for(let i = 0; i < contactsName.length; i++) {
        storiesBar.innerHTML += `
        <div class="stories-box">
        <div class="stories-icon"><img src="${contactsImg[i]}"></div>
        <h5>${contactsName[i]}</h5>
    `;
    }  
}
// This function filter the contacts through the input field
function filterContacts() {
    let searchInput = document.getElementById('searchInput').value;
    searchInput = searchInput.toLowerCase();
    let storiesBar = document.getElementById('storiesBar');
    storiesBar.innerHTML = '';
    for(let i = 0; i < contactsName.length; i++) {
        if (contactsName[i].toLowerCase().includes(searchInput)){
            storiesBar.innerHTML += `
            <div class="stories-box">
            <div class="stories-icon"><img src="${contactsImg[i]}"></div>
            <h5>${contactsName[i]}</h5>
            `;
        }
    }
    
}


