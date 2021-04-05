export const apiUrl = (route: string, params?: string) =>
  `${process.env.REACT_APP_API_URL}/${route}?api_key=${process.env.REACT_APP_API_KEY}&${params}`

export async function fetchSession(requestData: { request_token: string }) {
  return await fetch(apiUrl('authentication/session/new', ''), {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(requestData),
  })
}

export async function fetchAccount(session: string) {
  return await fetch(apiUrl('account', `session_id=${session}`))
}

export async function fetchFavouritesList(session: any) {
  return await fetch(
    apiUrl(
      `account/${session.account.id}/favorite/movies`,
      `session_id=${session.id}`
    )
  )
}

export async function fetchSetFavourite(
  session: any,
  requestData: { media_type: string; media_id: number; favorite: boolean }
) {
  return await fetch(
    apiUrl(
      `account/${session.account.id}/favorite`,
      `session_id=${session.id}`
    ),
    {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(requestData),
    }
  )
}

export async function fetchMovieDetails(id: string) {
  return await fetch(apiUrl(`movie/${id}`, ''))
}
export function fetchConfiguration() {
  return fetch(apiUrl('configuration', ''))
}

export function fetchMovieData(searchTerm: string) {
  return fetch(apiUrl('search/movie', `query=${searchTerm}`))
}
