import React, { Component } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import {TextField} from '@material-ui/core';


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
                .then(res => {
                    console.log(res);
                    this.handleReload()
                })
                .catch(err=>console.log(err));
    };
    handleReload = () => {
        window.location.reload();
    }

    render(){
        return(
            <div>
                <TextField 
                    name="name"
                    id="standard-multiline-flexible"
                    label="Name Please"
                    multiline
                    rowsMax={4}
                    onChange={this.handleInput}
                   value={this.state.name}
                    variant ="outlined"
                />
                  <TextField
                    name="bio"
                    id="standard-multiline-flexible"
                    label="Bio Please"
                    multiline
                    rows={4}
                    onChange={this.handleInput}
                    placeholder="Bio Please"
                    value={this.state.bio}
                />
                <IconButton aria-label="save"  >
                    <SaveIcon onClick={this.handleSubmit}/>
                </IconButton>
            </div>
        )
    }
}

export default UserForm;