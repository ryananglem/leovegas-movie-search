import React from 'react'
import { List } from '../../movieList/List'
export interface SearchResult {
  original_title: string
  overview: string
}

export interface Props {
  results: SearchResult[]
  term: string
}

export const SearchResults = ({ results, term }: Props): JSX.Element => (
  <div>
    <i>
      Movies matching the search term "<span>{term}</span>"
    </i>
    {/* 
        // @ts-ignore */}
    <List movieList={results} />
  </div>
)
