import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

function Search() {
    const users = useSelector((store)  => store.search);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_USERS'})
      }, []);
    

    return(
        <div align='center'>
            <h3>Search Users</h3>
            <input
                type='text'
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search Users'
            />
            <ul style={{ listStyleType: 'none' }}> 
                {users.filter((user) => {
                    return search.toLowerCase() === '' ? user : user.username.toLowerCase().includes(search);
                }).map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    )
}

export default Search;