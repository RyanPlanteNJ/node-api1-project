const express = require('express');
const shortid =require('shortid');

const server = express();

server.use(express.json());

let users = [];

server.get('/api/users', (req,res) =>{
    if (users) {
        res.json(users)
    } else {
        res.status(500).json({
            errorMessage: 'The users information could not be retrieved'
        })
    }
});

server.post('/api/users',(req,res) => {
    const userInfo = req.body;

    try{
        if (userInfo.name == '' || userInfo.bio == '') {
            res.status(400).json({
                errorMessage: 'Please provide name and bio for the user'
            });
        } else {
            req.body.id = shortid.generate();
            users.push(userInfo)
            res.status(201).json(userInfo);
        } 
    } catch {
        res.status(500).json({
            errorMessage: 'There was an error while saving the user to the database'
        });
    }
   
});

server.get('/api/users/:id', (req,res) => {
    const { id } = req.params;
    const found = users.find(user => user.id ===id);

    try{
        if (found) {
            res.status(200).json(found);
    } else {
        res.status(404).json({
            errorMessage: 'The user with the specified ID does not exist'
        });
        }
    } catch {
        res.status(500).json({
            errorMessage: 'The user information could not be retrieved'
        });
    }
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const found = users.find(user => user.id === id)

    try{
        if (found){
            users = users.filter(user => user.id !== id);
            res.status(200).json(found);
        } else {
            res.status(404).json({
                errorMessage: 'The user with the specified ID does not exist'
            });
        }
    } catch {
        res.status(500).json({
            errorMessage: 'The user could not be removed'
        });
    }
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    let index = users.findIndex(user => user.id === id);

    try{
        if (index !== -1 && changes.name !== '' && changes.id !== ''){
            changes.id = id;
            users[index] = changes;
            res.status(200).json(users[index]);
        } else if (changes.name == '' || changes.bio == '') {
            res.status(400).json({
                errorMessage: 'Please provide name and bio for the user'
            });
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not'
            });
        }
    } catch {
        res.status(500).json({
            errorMessage: 'The user information could not be modified'
        });
    }
});


const PORT = 5000;

server.listen(PORT, () =>{
    console.log(`listening on http://localhost:${PORT}`);
});