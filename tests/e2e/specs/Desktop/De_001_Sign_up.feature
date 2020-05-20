Feature: De_001_Sign_up

   Pruebas encargadas de realizar un registro 
   completo y los campos complementarios

  Scenario: Campos obligatorios.

    Given Estoy en la pagina de registro
    And   Doy click en el botón " Crear cuenta "
    Then  Veo los "5" mensajes de "Este campo es requerido"

  Scenario: Campos nombre y apellido

    Given Estoy en la pagina de registro
    And   Ingreso los datos
       |  Campo requerido  |    Valor    |
       |  Nombre *         |       E     |
       |  Apellido *       |       C     |
    Then  Veo los "2" mensajes de "Tu nombre es muy corto"

  Scenario: Validar el campo correo electronico

    Given Estoy en la pagina de registro
    And   Ingreso los datos
       |  Campo requerido       |    Valor           |
       |  Correo Electrónico *  |  liongmail.com     |
    Then Veo el mensaje "Escribe un correo válido"
    When Limpio el campo "Correo Electrónico *"
    And   Ingreso los datos
       |  Campo requerido       |    Valor           |
       |  Correo Electrónico *  |  li:on@gmail.com   |
    Then Veo el mensaje "Escribe un correo válido"
    When Limpio el campo "Correo Electrónico *"
    And   Ingreso los datos
       |  Campo requerido       |    Valor           |
       |  Correo Electrónico *  |  l ion@gmail.com   |
    Then Veo el mensaje "Escribe un correo válido"
  
    Scenario: Validar el campo de celular

    Given Estoy en la pagina de registro
    And   Ingreso los datos
       |  Campo requerido       |    Valor           |
       |  Celular *             |  123               |
    Then Veo el mensaje "Teléfono mínimo de 10 dígitos"
    When Limpio el campo "Celular *"
    And   Ingreso los datos
       |  Campo requerido       |    Valor           |
       |  Celular *             |  1111111111111111  |
    Then Veo el mensaje "Ingresa un número válido"
    
  Scenario: Validar el campo de contraseña

    Given Estoy en la pagina de registro
    And   Ingreso los datos
       |  Campo requerido       |    Valor           |
       |  Contraseña *          |    ges             |
    Then Veo el mensaje "Debes utilizar al menos 8 caracteres"
    When Limpio el campo "Contraseña *"
    And   Ingreso los datos
       |  Campo requerido       |    Valor           |
       |  Contraseña *          |    gestionix       |
    Then Veo el mensaje "Debes utilizar al menos una letra mayúscula"
    When Limpio el campo "Contraseña *"
    And   Ingreso los datos
       |  Campo requerido       |    Valor           |
       |  Contraseña *          |    Gestionix       |
    Then Veo el mensaje "Debes utilizar al menos un número"
    When Limpio el campo "Contraseña *"
    And   Ingreso los datos
       |  Campo requerido       |    Valor           |
       |  Contraseña *          |    Gestionix01     |
    And   Doy click en el botón-01 "visibility"
    Then  Veo la contraseña "Gestionix01"
    
  Scenario: Crear una cuenta

    Given Estoy en la pagina de registro
    And   Ingreso los datos
       |  Campo requerido       |    Valor                              |
       |  Nombre *              |    Roberto                            |
       |  Apellido *            |    Negocios                           |
       |  Contraseña *          |    Gestionix01                        |
     And   Ingreso un correo aleatorio
     And   Ingreso el pais "Ukraine"
     And   Ingreso celular aleatorio
     And   Doy click en el botón " Crear cuenta "
    Then   Veo la pantalla de Dasboard

  Scenario: Validar una cuenta existente

  Given Estoy en la pagina de registro
    And Ingreso los datos
       |  Campo requerido       |    Valor                              |
       |  Nombre *              |    Ruben  R.                          |
       |  Apellido *            |    Zoxa T.                            |
       |  Correo Electrónico *  |    qa.pruebasx01.autest.00@gmail.com  |
       |  Celular *             |    1236789334                         |
       |  Contraseña *          |    Gestionix01                        |
     And Ingreso el pais "Ukraine"  
     And Doy click en el botón " Crear cuenta "
    Then Veo el mensaje "Ya existe un usuario con el email indicado"
