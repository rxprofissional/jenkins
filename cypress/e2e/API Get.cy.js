describe('API GET Pessoa CPF', () => {
  it('deve consultar uma informação da API Pessoa', () => {

    cy.request({
      url: 'https://sescnet-tst.sesc-rs.com.br/senac/rest/api/gvcollege/pessoa?cpf=99529939000',
      method: 'GET'
    }).then(response => {
      expect(response.status).to.eq(200); // Verifica se a resposta tem status 200 OK
    });
  });
});
