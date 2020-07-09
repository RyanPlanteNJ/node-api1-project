import React from 'react';
import { Link } from 'react-router-dom';
import UserCard from "./UserCard";

function UserList ({users, id}){
    return(
        <div>
            {
            users.map(user => (
                   <UserCard key={user.id} user={user}/>
                ))
            }
        </div>
    );
}

export default UserList;