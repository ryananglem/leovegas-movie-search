
import { config } from '../config'

describe('search', () => {
    
    beforeEach(() => {
        window.localStorage.setItem('refreshToken', '123')
        cy.visit(`${config.website}`)
    })
  
    it('should display search page', () => {
      
        cy.get(`[data-testid="search-page"]`)
    })
    it('should search for film', () => {

        const film = 'Tillsammans'
        cy.get('[data-testid="search-box"]').type(film)
        cy.get('[data-testid="search-button"]').click()

        cy.get('[data-testid="item-title"]').contains(film)

    })
    it('should show message for for no film found', () => {

        const film = 'skjlsdgfkjnd'
        cy.get('[data-testid="search-box"]').type(film)
        cy.get('[data-testid="search-button"]').click()

        cy.get('[data-testid="no-film-message"]')

    })

})