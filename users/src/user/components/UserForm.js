import React, { useState } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import {TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      maxWidth: 250,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    margin: '0 auto',
  },
  button: {
      margin: '0 auto',
  }
}));



const initialForm = {
    name: '',
    bio: '',
};

export default function UserForm(){

    const classes = useStyles()
    const [userForm, setUserForm] = useState(initialForm);


    const handleInput = e => {
        setUserForm({...userForm, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
            axios
              .post('http://localhost:5000/api/users', userForm)
              .then(res => {
                    console.log(res);
                    handleReload()
                })
                .catch(err=>console.log(err));
    };
    const handleReload = () => {
        window.location.reload();
    }
        return(
        <form className= {classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    name="name"
                    id="standard-multiline-flexible"
                    label="Name Please"
                    multiline
                    rowsMax={4}
                    onChange={handleInput}
                    value={userForm.name}
                    variant ="outlined"
                />
                  <TextField
                    name="bio"
                    id="standard-multiline-flexible"
                    label="Bio Please"
                    multiline
                    rows={4}
                    onChange={handleInput}
                    placeholder="Bio Please"
                    value={userForm.bio}
                    variant ="outlined"
                />
                <IconButton aria-label="save" onClick={handleSubmit}>
                    <SaveIcon />
                </IconButton>
            </div>
          </form>  
        )
    }