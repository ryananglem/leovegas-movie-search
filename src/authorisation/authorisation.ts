import { apiUrl } from '../api'

export const requestToken = async () => {
  const token = await localStorage.getItem('refreshToken')
  if (!token || token === null) {
    const tokenResponse = await fetch(apiUrl('authentication/token/new', ''))
    const tokenData = await tokenResponse.json()

    const refreshToken = tokenData.request_token

    await localStorage.setItem('refreshToken', refreshToken)
    const redirectTo = window.location.origin

    window.location.href = `https://www.themoviedb.org/authenticate/${refreshToken}?redirect_to=${redirectTo}/auth-approved`
  }
}
