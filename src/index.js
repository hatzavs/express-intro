//open new project:
// terminal: npm init
// terminal: git init
// main_project: create ".gitignore"
// terminal: npm install nodemon --save-dev
// package.json --> under scripts--> "watch": "nodemon src/index.js",
// save (ctrl+S)
// terminal: npm run watch

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const users = [{"id":1,"username":"hatzav1","password":"123456"},{"id":2,"username":"hatzav2","password":"123456"},{"id":3,"username":"hatzav3","password":"123456"}];
let counter = users.length + 1;
const photos = [
    {"id":1,"title":"butterfly","url":"data:image/jpeg;base64,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"},
    {"id":2,"title":"beach","url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuPSSeONe6eooMVIahPrlK6irGipA0GnGKyw&usqp=CAU"},
    {"id":3,"title":"mickeymouse","url":"data:image/jpeg;base64,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"}
];
let photosCounter = photos.length + 1;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//=================================Users======================================//
app.put('/user', createUser);
    
app.get('/user', (req, res) => {res.send(JSON.stringify(users))});

app.get('/user/:id', getUserById);

app.delete('/user/:id', deleteUser);

app.post('/user/:id', editUser);

app.post('/user/login', login); // masked by edit user...

//================================Photos=======================================//
app.put('/photo', createPhoto);
    
app.get('/photo', getAllPhotos);

app.get('/photo/:id', getPhotoById);

app.delete('/photo/:id', deletePhoto);

app.post('/photo/:id', editPhoto);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


//=============================== Users-functions ==============================//

function createUser(req, res) {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).send('Incorrect username or password');
        return;
    }
    if (username < 3 || password.length < 6) {
        res.status(400).send('Invalid username or password');
        return;
    }
    const newUser = {
        id: counter,
        username,
        password
    }
    counter++;
    users.push(newUser);
    res.sendStatus(201);
}

function deleteUser(req, res) {
    const userId = parseInt(req.params.id);
    const reqUserIndex = users.findIndex(user => user.id === userId);
    let userToDelete = '';
    if (reqUserIndex === -1) {
        res.sendStatus(404);
        return;
    }
    userToDelete = users[reqUserIndex].username;
    users.splice(reqUserIndex, 1);
    res.status(204).send(`User ${userToDelete} has been deleted.`);
}

function getUserById(req, res) {
    const userId = parseInt(req.params.id);
    const requestedUser = users.find(user => user.id === userId);
    if (!requestedUser) {
        res.sendStatus(404);
        return;
    }
    res.send(requestedUser);
}

function editUser(req, res) {
    const userId = parseInt(req.params.id);
    const requestedUser = users.find(user => user.id === userId);
    const {username, password} = req.body;
    const oldUser = requestedUser;
    if(req.url === '/user/login') {
        login(req, res);
        return;
    }
    if (!requestedUser) {
        res.sendStatus(404);
        return;
    }
    if (!username || !password) {
        res.status(400).send('Incorrect username or password, no changes have been made');
        return;
    }
    if (username < 3 || password.length < 6) {
        res.status(400).send('Invalid username or password, no changes have been made');
        return;
    }
    requestedUser.username = username;
    requestedUser.password = password;
    res.status(200).send(`Saved changes.${username === oldUser.username ? '' : `\nUsername changed to ${username}`}.`);
}

function login(req, res) {
    const {username, password} = req.body;
    const logedUser = users.find(user => user.password === password);
    logedUser ? res.status(200).send(`Hi ${username}`) : res.sendStatus(403);
}

//=============================== Photos-functions ==============================//

function createPhoto(req, res) {
    const {title, url} = req.body;
    if (!title || !url) {
        res.status(400).send("Missing photo's title or url.");
        return;
    }
    newPhoto = {
        id: photosCounter,
        title,
        url
    };
    photosCounter++;
    photos.push(newPhoto);
    res.status(200).send(`<div>Added photo - ${newPhoto.title}:</div> <img src=${newPhoto.url}>`);
}

function getAllPhotos(req, res) {
    let photosAsHTML = photos.map(photo => `<img src=${photo.url}>`);
    let photosStr = '';
    photosAsHTML.forEach(item => photosStr += item);
    res.send(photosStr);
}

function getPhotoById(req, res) {
    const photoId = parseInt(req.params.id);
    const reqPhoto = photos.find(photo => photo.id === photoId);
    if (!reqPhoto) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(`<div>${reqPhoto.title}:</div> <img src=${reqPhoto.url}>`);
}

function deletePhoto(req, res) {
    const photoId = parseInt(req.params.id);
    const reqPhotoIndex = photos.findIndex(photo => photo.id === photoId);
    if (reqPhotoIndex === -1) {
        res.sendStatus(404);
        return;
    }
    photos.splice(reqPhotoIndex, 1);
    res.status(204).send('Deleted photo.');
}

function editPhoto(req, res) {
    const {title, url} = req.body;
    const photoId = parseInt(req.params.id);
    const reqPhoto = photos.find(photo => photo.id === photoId);
    if (!title || !url) {
        res.status(400).send('Not saved. Missing title or url.');
        return;
    }
    reqPhoto.title = title;
    reqPhoto.url = url;
    res.status(200).send(`Saved changes.`);

}
