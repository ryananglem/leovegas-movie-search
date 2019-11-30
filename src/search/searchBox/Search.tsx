import React, {useState} from 'react'
import styled from 'styled-components'
import leoVegasLogo from './leovegas.jpg'
import movieDbLogoLarge from './the-movie-db-large.svg'

export interface Props {
    onSearch: (searchTerm: string) => void
}

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
`
const SearchInput = styled.input`
    height: 30px;
    padding-left: 10px;
    width: 35%
`
const SearchButton = styled.button`
    height: 36px;
`
const Logo = styled.img`
    height: 36px;
    padding-right: 20px;
`
const ErrorMessageText = styled.div`
    color: red;
    padding-left: 56px;
`
const MovieDbLogoImage = styled.img`
    height: 36px;
    padding-left: 20px;
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
            setSearchTerm('')
        } else {
            setIsValid(false)
        }
    }

    return (
        <>
        <SearchBoxContainer>
            <Logo src={leoVegasLogo} alt="logo" />
            <SearchInput type="text" placeholder="Search for a movie.." 
                onKeyDown={handleKeyDown}
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)}
            />        
            <SearchButton onClick={search}>Search</SearchButton>   
            <MovieDbLogoImage src={movieDbLogoLarge} />     
        </SearchBoxContainer>
        {searchClicked && !isValid && <ErrorMessageText>Please enter a movie name to search for</ErrorMessageText>}
    </> 
    )
}