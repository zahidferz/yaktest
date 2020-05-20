import { Then, and } from "cypress-cucumber-preprocessor/steps";


Given('Estoy en la pagina de registro',()=>{
    Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        /* eslint-disable */
        console.log("Caught error", err);
        /* eslint-enable */
        return false;
      });
    const link = Cypress.env('HOST')
    cy.visit(`${link}registro`,{failOnStatusCode: false});
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
    // should have found 5 elements
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

When(/Limpio el campo "(.*)"/,selectField=>{

  const clearField = selectField;

    cy.findByLabelText(clearField).clear();

});

Then(/Veo el mensaje "(.*)"/, message => {
  const selectorMsj = message;
  cy.findByText(selectorMsj)
    .should("be.visible")
    .and('exist');
});

When(/Doy click en el botón-01 "(.*)"/,buttonTitle=>{

const selectortitle = buttonTitle;

  cy.findByText(selectortitle).click()
});

Then(/Veo la contraseña "(.*)"/, Pws => {
  const selectorPws = Pws;
  cy.findByLabelText("Contraseña *")
    .should("have.value", selectorPws);
});

Then("Veo la pantalla de Dasboard", () => {

    cy.wait(5000).url()
    .should('contain', '/web/dashboard');
});

When(/Ingreso el pais "(.*)"/,countryTitle=>{
const selectCountry = countryTitle
  cy.findByText('México')
    .click()
  cy.findAllByText(selectCountry)
    .click();
});

When('Ingreso un correo aleatorio',()=>{

  cy.findByText('Correo Electrónico *')
    .type(`qa.pruebas+autest${Math.round(Math.random()*(100,999))}@gmail.com`);

});

When('Ingreso celular aleatorio', ()=>{
  cy.findByText('Celular *').type(`123${Math.round(Math.random()*(1000001,9999999))}`)
});
