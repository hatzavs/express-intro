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
const users = [];
let counter = 1;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.put('/user', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).send('Incorrect username or password');
    }

    if (username < 3 || password < 6) {
        res.status(400).send('Invalid username or password');
    }

    const newUser = {
        id: counter,
        username,
        password
    }
    counter++;
    users.push(newUser);
    res.sendStatus(201);
});

app.get('/user', (req, res) => {
    res.send(users);
});

app.get('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const requestedUser = users.find(user => user.id === userId);
    if (!requestedUser) {
        res.sendStatus(404).send('User not found');
    }
    res.send(requestedUser);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

