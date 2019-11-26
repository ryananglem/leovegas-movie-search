import React, {useState} from 'react'

export interface Props {
    onSearch: (searchTerm: string) => void
}

export const Search = ({onSearch}: Props):JSX.Element => {

    const [searchTerm, setSearchTerm] = useState('')
    return (
    <>
        <input type="text" placeholder="Search for a movie.." value={searchTerm}onChange={e => setSearchTerm(e.target.value)} />        
        <button onClick={() => onSearch(searchTerm)}>Search</button>
    </>)
}