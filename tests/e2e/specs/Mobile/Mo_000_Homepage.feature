Feature: Primer ingreso a la pagina de YAK mobile


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

  Scenario: Ver regreso a la pagina de YAK (Inicio de Sesión) 

    Given Abro la pagina de YAK
    And   Doy click en el botón "INICIAR SESIÓN"
    And   Doy click en el la liga "keyboard_backspace"
    Then  Veo la pagina de YAK

  Scenario: Ver regreso a la pagina de YAK (Registro)

    Given Abro la pagina de YAK
    And   Doy click en el botón "CREAR CUENTA"
    And   Doy click en el la liga "keyboard_backspace"
    Then  Veo la pagina de YAK