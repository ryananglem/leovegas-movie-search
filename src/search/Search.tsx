import React, {useState} from 'react'

export const Search = () => {

    const [searchTerm, setSearchTerm] = useState('')
    return (
    <>
        <h1>
            Search
        </h1>
        <input type="text" placeholder="Search for a movie.." value={searchTerm}onChange={e => setSearchTerm(e.target.value)} />        
    </>)
}