const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://ecommerce.sesc-rs.com.br",
    supportFile: false,  // Desativa o arquivo de suporte
    specPattern: "**/*.cy.{js,jsx,ts,tsx}"
  },
});
