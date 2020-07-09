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
    try{
        if (req.body.name == '' || req.body.bio == '') {
            res.status(400).json({
                errorMessage: 'Please provide name and bio for the user'
            });
        } else {
            userInfo = req.body;
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

const PORT = 5000;

server.listen(PORT, () =>{
    console.log(`listening on http://localhost:${PORT}`);
});