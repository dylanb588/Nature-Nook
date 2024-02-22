const { useSelector } = require("react-redux");


function Notes() {
    const notes = useSelector(store => store.notes);
}