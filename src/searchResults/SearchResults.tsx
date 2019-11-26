import React from 'react'

export interface SearchResult {
    original_title: string
    overview: string
}

export interface Props {
    results: SearchResult[]
}

export const SearchResults = ({results}:Props):JSX.Element => {

    const resultList = results.map(result => <div>
        <h4>{result.original_title}</h4>
        <p>
            {result.overview}
        </p>
        </div>)

    return (
        <div>
            {resultList}
        </div>
    )
}