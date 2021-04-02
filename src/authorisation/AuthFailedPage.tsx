import React from 'react'

export const AuthFailedPage = () => {
  const tryAgain = () => {
    window.location.href = '/'
  }
  return (
    <>
      <div>
        You have not granted the authorisation required to use this application
      </div>
      <div>
        <button onClick={tryAgain}>try again</button>
      </div>
    </>
  )
}
