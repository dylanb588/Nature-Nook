import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom'

function Search() {
    const users = useSelector((store)  => store.search);
    const loggedIn = useSelector(store => store.user);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    console.log(loggedIn);

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
                    // Filter out the logged-in user's name from the list
                    return (search.toLowerCase() === '' && user.id !== loggedIn.id) ||
                        (user.username.toLowerCase().includes(search) && user.id !== loggedIn.id);
                }).map((user) => (
                    <Link key={user.id} to={`/user/${user.id}`}>
                        <img src={user.profile_pic} />
                        <li>{user.username}</li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Search;