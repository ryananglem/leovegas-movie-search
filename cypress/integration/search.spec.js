
import { config } from '../config'

describe('search', () => {
    
    beforeEach(() => {
        window.localStorage.setItem('refreshToken', '123')
        cy.visit(`${config.website}`)
    })
  
    it('should display search page', () => {
      
        cy.get(`[data-testid="search-page"]`)
    })
    it('should search for tillsammans', () => {

        cy.get('[data-testid="search-box"]').type('tillsammans')
        cy.get('[data-testid="search-button"]').click()

    })
})