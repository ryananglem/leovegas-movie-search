import React from 'react'

import { State } from '../store'
import { Search } from './searchBox/Search';
import { Loading } from '../page/Loading';
import { searchForMovies } from './search.redux';
import { SearchResults } from './searchResults/SearchResults';
import { connect } from 'react-redux';

interface StateProps {
        isLoading: boolean
        searchResults: any,
        searchTerm: string
    }
    interface DispatchProps {
        search: (term: string) => void
    }
    
    interface Props extends DispatchProps, StateProps {}
    
export const SearchPage = ({ isLoading, search, searchResults, searchTerm } : Props): JSX.Element => {
 
    return (
      <>
      <div>
        <Search onSearch={search} />
      </div>
      {searchResults && 
      <div>
        { (isLoading) ? <Loading /> : (
          <SearchResults term={searchTerm} results={searchResults} />
        )}
      </div>
      }
      </>
    )
  }
  const mapStateToProps = (state: State) => ({
    isLoading: state.search.isSearching,
    searchTerm: state.search.searchTerm,
    searchResults: state.search.data && state.search.data.results
  })
  const mapDispatchToProps = (dispatch: any) => ({
    search: (term: string) => dispatch(searchForMovies(term))
  })
  
export const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchPage)
  