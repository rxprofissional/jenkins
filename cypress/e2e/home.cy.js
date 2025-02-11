describe('Fluxo Ecommerce', () => {
  context('720 resolution',() => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
      }
    )
  })
    it('Deve seguir um fluxo de consulta no Ecommerce', () => {

      cy.visit('https://ecommerce.sesc-rs.com.br/ecommerce.landingpage.aspx')

      cy.get('#TABLETXTTITULO > :nth-child(1) > .col-xs-12')

      cy.get('#GRIDLANDINGPAGE__IMG_0001').click()

      cy.get('#vBANNERFILTROCIDADE').click()

      cy.get('#vBANNERFILTROCIDADE').type('Porto Alegre')

      cy.get('#vPRODUTOIMAGEM_0002').click()

      cy.get('#span_vPRODUTODESCRICAO')
      
      //cy.get('Sesc Fitness (Musculação) Plano Anual')

  })
})