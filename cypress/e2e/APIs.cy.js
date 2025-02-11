describe('API PUT Pessoa CPF', () => {
  it('deve alterar uma informação da API Pessoa', () => {

    cy.request({
      url: 'https://sescnet-tst.sesc-rs.com.br/senac/rest/api/gvcollege/pessoa',
      method: 'PUT',
      body: {
        "id": "5416966",
        "idExterno": "1234",
        "CPF": "12345678927",
        "CNPJ": "",
        "Nome": "Pessoa teste 01",
        "NomeSocialFantasia": "Teste",
        "RG": "0102",
        "OrgaoEmissorRG": "SSP",
        "DataNascimento": "1990-07-10",
        "NomeMae": "Teste Mae",
        "Sexo": "M",
        "Nacionalidade": "Brasil",
        "Ativo": true,
        "Tipo": "F",
        "Banco": "1",
        "Agencia": "1234",
        "ContaCorrente": "123456",
        "Endereco": {
            "Nome": "FREI DAMIÃO",
            "CEP": "09695100",
            "Numero": "1234",
            "Complemento": "AP 23",
            "Bairro": "Centro",
            "Cidade": "Fortaleza",
            "UF": "CE"
        },
        "Telefone": {
            "DDD": "85",
            "Numero": "999999999"
        },
        "FormaPgto": {
            "Cod": 2,
            "Descricao": "teste",
            "Tipo": "J"
        }
      }
    }).then(response => {
      expect(response.status).to.eq(200);  // Verifica se a resposta tem status 200 OK
    });
  });
});
