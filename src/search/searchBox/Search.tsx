import React, {useState} from 'react'
import styled from 'styled-components'

export interface Props {
    onSearch: (searchTerm: string) => void
}


const SearchBoxContainer = styled.div`

`
const SearchInput = styled.input`
    height: 30px;
    padding-left: 10px;
    width: 35%
`
const SearchButton = styled.button`
    height: 36px;
`
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
    <SearchBoxContainer>
        <SearchInput type="text" placeholder="Search for a movie.." 
            onKeyDown={handleKeyDown}
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
         />        
        <SearchButton onClick={search}>Search</SearchButton>
        {searchClicked && !isValid && <div>Please enter a movie name to search for</div>}
    </SearchBoxContainer>)
}