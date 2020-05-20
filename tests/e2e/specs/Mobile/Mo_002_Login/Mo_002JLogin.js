
beforeEach(() => {
  cy.viewport(375, 667);
});

Given('Estoy en la pagina de login', ()=>{
  const link = Cypress.env('HOST')
    cy.visit(`${link}login`, {failOnStatusCode: false});
});

When(/Doy click en el botón "(.*)"/,buttonTitle=>{
    const selectortitle =buttonTitle;
      cy.get(`[data-testid="${selectortitle}"]`)
        .click();
  });

Then(/Veo los "(.*)" mensajes de "(.*)"/,(valueTitle,messageTitle )=>{
    const showMessage = messageTitle;
    const foundValues = valueTitle; 
    cy.findAllByText(showMessage).should(($p) => {
       // should have found 2 elements
       expect($p).to.have.length(foundValues);
       }).and('be.visible').and('exist');
   });

  When(/Ingreso los datos/,requiredFields=>{
    requiredFields.rawTable.slice(1).forEach(requiredFieldDef => {
      const selector = requiredFieldDef[0];
      const value = requiredFieldDef[1];
      cy.findByText(selector).type(value,{ delay: 100 }); 
    });
  });

  Then(/Veo el mensaje "(.*)"/, message => {
    const selectorMsj = message;
    cy.findByText(selectorMsj).should("be.visible").and('exist');
  });

  Then("Veo la pantalla de Dasboard", () => {
    cy.wait(5000).url()
    .should('contain', '/web/dashboard');
});