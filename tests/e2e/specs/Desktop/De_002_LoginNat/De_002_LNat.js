
Given('Estoy en la pagina de login', ()=>{
  const link = Cypress.env('HOST')
    cy.visit(`${link}login`, {failOnStatusCode: false});
});

When(/Doy click en el botón "(.*)"/,buttonTitle=>{
    const selectortitle =buttonTitle;
      cy.get(`[data-testid="${selectortitle}"]`)
        .click();
  });

  When(/Ingreso los datos/,requiredFields=>{
    requiredFields.rawTable.slice(1).forEach(requiredFieldDef => {
      const selector = requiredFieldDef[0];
      const value = requiredFieldDef[1];
      cy.findByText(selector).type(value,{ delay: 100 }); 
    });
  });

  Then("Veo la pantalla de Dasboard", () => {
    cy.wait(5000).url()
    .should('contain', '/web/dashboard');
});