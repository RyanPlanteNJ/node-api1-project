import React, {useState, useEffect} from 'react';
import axios from 'axios';

import UserList from './user/components/UserList';
import UserForm from './user/components/UserForm';

function App() {
  const [users, setUsers] = useState([]);

  const getUsers =() => {
    axios
    .get("http://localhost:5000/api/users")
    .then (res => {
      console.log(res)
      setUsers(res.data)
    })
    .catch(err => console.log(err.response));
  };

  useEffect(() => {
    getUsers();
  },[])

  return (
  <>
    <UserList users={users}/>
    <UserForm users={users} setUsers={setUsers} />
  </>
  );
}

export default App;