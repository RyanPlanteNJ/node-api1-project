import React from 'react';
import axios from 'axios';

import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from '@material-ui/core/styles';
import {Card} from '@material-ui/core';
import {CardContent} from '@material-ui/core';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
        backgroundColor: '#aa8f79',
        borderColor: '#3f2a14',
        margin: "0 auto",
        marginBottom: 5,
        marginTop: 5
    },
    name: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
    bio:{
        fontSize: 15,
    }
});

export default function UserCard(props) {

    const classes = useStyles();
    const { name, bio, id } = props.user;
    const users = props.user;
    
    const deleteUser = () => {
        axios
            .delete(`http://localhost:5000/api/users/${id}`)
            .then(res => {
                window.location.reload();
               })
            .catch(err =>
                console.error("UserCard.js: deleteUser: err", err.message)
                );
    };

    return (
        <Card key={users.id} className={classes.root}>
            <CardContent>
                <Typography 
                    className={classes.name} color="textSecondary" component="h2">{name}
                </Typography>
                <Typography className={classes.bio} variant="body2" component="p">{bio}</Typography>
            <IconButton aria-label="edit">
                <EditIcon />
            </IconButton>
            <IconButton aria-label="delete"onClick={()=>deleteUser()}>
                <DeleteIcon />
            </IconButton>
            </CardContent>
        </Card>
    )
};
