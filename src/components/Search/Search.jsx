import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import './Search.css';

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
        <div className='search-container'>
            <h3 className='search-title'>Search Users</h3>
            <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='search-input'
                placeholder='Search Users'
            />
            <ul className='user-list'>
                {users.filter((user) => {
                    // Convert both search input and usernames to lowercase for case-insensitive comparison
                    const searchLowerCase = search.toLowerCase();
                    const usernameLowerCase = user.username.toLowerCase();
                    // Filter out the logged-in user's name from the list and perform case-insensitive search
                    return (searchLowerCase === '' && user.id !== loggedIn.id) ||
                    (usernameLowerCase.includes(searchLowerCase) && user.id !== loggedIn.id);
                        }).map((user) => (
                        <li className='user-item' key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <Avatar src={user.profile_pic} alt={user.username} className='user-avatar' />
                                <span className='user-name'>{user.username}</span>
                            </Link>
                        </li>
                ))}
            </ul>
        </div>
    );
}

export default Search;