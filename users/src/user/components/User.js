import React, {useEffect, useState} from 'react';
import axis from 'axios';
import UserCard from './UserCard';


function User () {
    const [user,setUser] = useState(null);


    const fetchUser= (id) => {
        axios
            .get (`http:localhost:5000/api/user/${id}`)
            .then((res) => setUser(res.data))
            .catch((err)=>console.error(err.message,err.response))
    };

    useEffect(() =>{
        fetchUser(match.params.id);
    },[match.params.id]);

    return (
    <div>
        <UserCard user={user} />
    </div>
    );
}