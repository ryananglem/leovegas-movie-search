import React, {useState} from 'react'

export interface Props {
    onSearch: (searchTerm: string) => void
}

export const Search = ({onSearch}: Props):JSX.Element => {

    const [searchTerm, setSearchTerm] = useState('')  
    const [isValid, setIsValid] = useState(false)
    const [searchClicked, setSearchClicked] = useState(false)

    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter') {
            search()
        }
    }
    const search = () => {
        setSearchClicked(true)
        if (searchTerm.length > 0) {
            setSearchClicked(false)
            onSearch(searchTerm)
        } else {
            setIsValid(false)
        }
    }

    return (
    <>
        <input type="text" placeholder="Search for a movie.." 
            onKeyDown={handleKeyDown}
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
         />        
        <button onClick={search}>Search</button>
        {searchClicked && !isValid && <div>Please enter a movie name to search for</div>}
    </>)
}