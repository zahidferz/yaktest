
beforeEach(() => {
  cy.viewport(375, 667);
});

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

Given(/Doy click en el botón "(.*)"/, buttonTitle => {
  const selectorTitle = buttonTitle;
  cy.findByText(selectorTitle).click();
});

When(/Limpio el campo "(.*)"/, CamSelec => {
  const selectorCampo = CamSelec;
  cy.findByLabelText(selectorCampo).clear();
});

Then(/Ingreso en el campo "(.*)" los datos "(.*)"/, (CamSelec, DatoInt) => {
  const selectorCampo = CamSelec;
  const selectorDato = DatoInt;
  cy.findByLabelText(selectorCampo).type(selectorDato);
});

Then(/Muestra el mensaje de "(.*)"/, message => {
  const selectorMsj = message;
  cy.findByText(selectorMsj).should("exist");
});

Then(/Veo la contraseña "(.*)"/, Pws => {
  const selectorPws = Pws;
  cy.findByLabelText("Contraseña").should("have.value", selectorPws);
});

When(/Ingreso el codigo del pais "(.*)"/,codeTitle=>{
  const codeCountry = codeTitle
    cy.findByPlaceholderText('CountryCodeDropdown')
      .select(codeCountry);
  });

  When('Ingreso un correo aleatorio',()=>{
    cy.findByLabelText('Correo Electrónico')
      .type(`qa.pruebas+autest${Math.round(Math.random()*(100,999))}@gmail.com`,{force:true});
  });

  When('Ingreso celular aleatorio', ()=>{
    cy.findByLabelText('Celular')
      .type(`123${Math.round(Math.random()*(1000001,9999999))}`)
  });

  Then("Puedo ver la pagina de Dashboard", () => {
    cy.wait(3000)
      .url()
      .should("contain", 'web/dashboard');
  });