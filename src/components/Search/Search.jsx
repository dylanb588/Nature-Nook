import {useSelector, useDispatch} from 'react-redux';

function Search() {
    const users = useSelector((store)  => store.search);
    console.log(users);

    return(
        <div>
            <h3>Search Page!!</h3>
        </div>
    )
}

export default Search;