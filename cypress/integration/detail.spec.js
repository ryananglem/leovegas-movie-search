import { config } from '../config'

describe('movie detail', () => {
    
    beforeEach( () => {
        
    })
  
    it('should open film detail page',  () => {

        console.log('localstorage', window.localStorage.getItem('refreshToken'))

        fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=61d59ef5b346ef2091b6edfd3a3c8876').then(response => {
        
            console.log('sessionResponse', response)
            response.json().then((session) => {

          
            console.log('session:', session)    
            window.localStorage.setItem('refreshToken', session.guest_session_id) 
        
            console.log('localstorage', window.localStorage.getItem('refreshToken'))
        
            const filmId = 742
            cy.visit(`${config.website}/detail/${filmId}`)

            cy.get(`[data-testid="detail-page"]`)
        })
        }
      
    )
})
})