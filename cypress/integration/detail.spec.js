import { config } from '../config'

describe('movie detail', () => {
    
    beforeEach( () => {
        
    })
  
    it('should open film detail page',  () => {


        fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=61d59ef5b346ef2091b6edfd3a3c8876').then(response => {
        
            response.json().then((session) => {
            window.localStorage.setItem('refreshToken', session.guest_session_id) 
            const filmId = 742
            cy.visit(`${config.website}/detail/${filmId}`)

            cy.get(`[data-testid="detail-page"]`)
        })
        }
      
    )
})
})