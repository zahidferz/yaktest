import { Given, Then, When, when } from "cypress-cucumber-preprocessor/steps";

beforeEach(() => {
    cy.viewport(375, 667);
});

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
      .should('contains', '/registro/infogeneral');
    cy.get('.text-center')
      .should('be.visible')
      .and('exist')
      .and('contain', '¡Hola!')
      .and('contain', '¿Cómo te llamas?');
    cy.findByLabelText('Nombre')
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
