import React from 'react'

export interface SearchResult {
    original_title: string
}

export interface Props {
    results: SearchResult[]
}

export const SearchResults = ({results}:Props) => {

    const resultList = results.map(result => <div>{result.original_title}</div>)

    return (
        <div>
            {resultList}
        </div>
    )
}