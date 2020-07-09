import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from '@material-ui/core';

const UserCard = props => {
    const { name, bio, id } = props.user;
    const users = props.user;
    
    const deleteUser = () => {
        axios
            .delete(`https://localhost:5000/api/users/${id}`)
            .then(res => {
                console.log('delete res', res);
               })
            .catch(err =>
                console.error("UserCard.js: deleteUser: err", err.message,err.status)
                );
    };

    return (
        <div>
            <h2>{name}</h2>
            <h2>{bio}</h2>
            <Button color="secondary" onClick={()=>deleteUser()}>Delete</Button>
        </div>
    )
};

export default UserCard;