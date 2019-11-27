import React, {useState} from 'react'

export interface Props {
    onSearch: (searchTerm: string) => void
}

export const Search = ({onSearch}: Props):JSX.Element => {

    const [searchTerm, setSearchTerm] = useState('')  

    let isValid = false
    let searchClicked = false
    const search = () => {
        searchClicked = true
        if (searchTerm.length > 0) {
            onSearch(searchTerm)
        } else {
            isValid = false
        }
    }
    console.log('valid', isValid)

    return (
    <>
        <input type="text" placeholder="Search for a movie.." value={searchTerm}onChange={e => setSearchTerm(e.target.value)} />        
        <button onClick={search}>Search</button>
        {searchClicked && !isValid && <div>Please enter a movie name to search for</div>}
    </>)
}