import { config } from '../config'

describe('movie detail', () => {
    
    beforeEach(() => {
        window.localStorage.setItem('refreshToken', '123')        
    })
  
    it('should open film detail page', () => {
        const filmId = 742
        cy.visit(`${config.website}/detail/${filmId}`)

        cy.get(`[data-testid="detail-page"]`)
    })
})