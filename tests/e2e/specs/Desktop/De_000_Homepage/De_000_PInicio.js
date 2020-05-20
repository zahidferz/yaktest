import { Given, Then, When, when } from "cypress-cucumber-preprocessor/steps";
import { constants } from "buffer";
import { exists, watchFile, link } from "fs";



// Código que permite a los scripts, entrar a la pagina solicitada.(Solo para aplicaciones de scritorio)
Given("Abro la pagina de YAK", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    /* eslint-disable */
    console.log("Caught error", err);
    /* eslint-enable */
    return false;
  });
  const link = Cypress.env('HOST')
  cy.visit(`${link}`);
});

When(/Doy click en el botón "(.*)"/,buttonTitle=>{

  const selectorTitle = buttonTitle;

    cy.get(`[data-testid="${selectorTitle}"]`)
      .click();

});

when(/Doy click en el la liga "(.*)"/, linkTitle=>{

  const selectorTitle = linkTitle
  
    cy.findByText(selectorTitle)
      .click();
})

Then("Veo la pagina de YAK",()=>{

    cy.findByText('CREAR CUENTA')
      .should('be.visible')
      .and('exist');

    cy.findByText('INICIAR SESIÓN')
      .should('be.visible')
      .and('exist');
});

Then("Veo la pagina de registro YAK",()=>{

  cy.url()
    .should('contain','/registro');

  cy.findByText('Nombre *')
    .should('be.visible')
    .and('exist');

  cy.findByText('Apellido *')
    .should('be.visible')
    .and('exist');

  cy.findByText('Correo Electrónico *')
    .should('be.visible')
    .and('exist');

  cy.findByText('México')
    .should('be.visible')
    .and('exist');
  
  cy.findByText('Celular *')
    .should('be.visible')
    .and('exist');

  cy.findByText('Contraseña *')
    .should('be.visible')
    .and('exist');

  cy.findByText('Crear cuenta')
    .should('be.visible')
    .and('exist');
  
  cy.findByText('Crear cuenta')
    .should('be.visible')
    .and('exist');

  cy.findByText('Inicia sesión')
    .should('be.visible')
    .and('exist');
    
});

Then('Veo la pagina de login YAK',()=>{

cy.url()
  .should('contain','/login');

cy.findByText('Correo Electrónico')
  .should('be.visible')
  .and('exist');

cy.findByText('Contraseña')
  .should('be.visible')
  .and('exist');

cy.findByText('Entrar')
  .should('be.visible')
  .and('exist');

});