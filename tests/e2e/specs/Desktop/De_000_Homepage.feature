Feature: Primer ingreso a la pagina de YAK

  


  Scenario: Ver la pantalla de YAK

    Given Abro la pagina de YAK
    Then  Veo la pagina de YAK

  Scenario: Ver la pagina de registro de YAK

    Given Abro la pagina de YAK
    And   Doy click en el botón "CREAR CUENTA"
    Then  Veo la pagina de registro YAK

  Scenario: Ver la pagina de login de YAK

    Given Abro la pagina de YAK
    And   Doy click en el botón "INICIAR SESIÓN"
    Then  Veo la pagina de login YAK

  Scenario: Ver la liga de registro a login en YAK

    Given Abro la pagina de YAK
    And   Doy click en el botón "CREAR CUENTA"
    And   Doy click en el la liga "Inicia sesión"
    Then  Veo la pagina de login YAK
  
  Scenario: Ver regreso a la pagina de YAK

    Given Abro la pagina de YAK
    And   Doy click en el botón "INICIAR SESIÓN"
    And   Doy click en el la liga "Regresar"
    Then  Veo la pagina de YAK

