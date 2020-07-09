import React, { Component } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

class UserForm extends Component {
    state = {
        name: '',
        bio: ''
    };

    handleInput = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, bio } = this.state;
        const newUser = { name, bio };
        const saveUser =
            axios
                .post('http://localhost:5000/api/users', newUser)
                .then(res=>{
                    console.log(res);
                    this.handleReload();
                })
                .catch(err=>console.log(err));
    };
    handleReload = () => {
        window.location.reload();
    }

    render(){
        return(
            <div>
                <input
                    type="text"
                    name="name"
                    onChange={this.handleInput}
                    placeholder="Name Please"
                    value={this.state.name}
                />
                <input
                    type="text"
                    name="bio"
                    onChange={this.handleInput}
                    placeholder="Bio Please"
                    value={this.state.bio}
                />
                <Button color="primary" onClick={this.handleSubmit}>Save User</Button>
            </div>
        )
    }
}

export default UserForm;