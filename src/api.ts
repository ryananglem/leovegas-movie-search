

export const apiUrl = (route: string, params?: string) => 
    (`${process.env.REACT_APP_API_URL}/${route}?api_key=${process.env.REACT_APP_API_KEY}&${params}`)