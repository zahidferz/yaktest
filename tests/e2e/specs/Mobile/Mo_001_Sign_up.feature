Feature: Mo_001_Sing_up

   Prueba que se encarga de validar los campos y 
   la capacidad de crear un usuario de tipo mobile



Scenario: Campo Nombre

    Given  Estoy en la pagina de registro
    When   Ingreso en el campo "Nombre" los datos "E"
    Then   Muestra el mensaje de "Tu nombre es muy corto"
    And    Limpio el campo "Nombre"
    And    Doy click en el botón "arrow_forward"
    Then   Muestra el mensaje de "Este campo es requerido"

Scenario: Campo Apellido

    Given  Estoy en la pagina de registro
    When   Ingreso en el campo "Nombre" los datos "Gibram"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Apellidos" los datos "C"
    Then   Muestra el mensaje de "Tu nombre es muy corto"
    And    Limpio el campo "Apellidos"
    And    Doy click en el botón "arrow_forward"
    Then   Muestra el mensaje de "Este campo es requerido"


Scenario: Campo correo electrónico

    Given  Estoy en la pagina de registro
    When   Ingreso en el campo "Nombre" los datos "Jaime"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Apellidos" los datos "Morales"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Correo Electrónico" los datos "liongmail.com"
    Then   Muestra el mensaje de "Escribe un correo válido"
    And    Limpio el campo "Correo Electrónico"
    When   Ingreso en el campo "Correo Electrónico" los datos "li:on@gmail.com"
    Then   Muestra el mensaje de "Escribe un correo válido"
    And    Limpio el campo "Correo Electrónico"
    When   Ingreso en el campo "Correo Electrónico" los datos "l ion@gmail.com"
    Then   Muestra el mensaje de "Escribe un correo válido"
    And    Limpio el campo "Correo Electrónico"
    And    Doy click en el botón "arrow_forward"
    Then   Muestra el mensaje de "Este campo es requerido"

  Scenario: Campo teléfono

    Given  Estoy en la pagina de registro
    When   Ingreso en el campo "Nombre" los datos "Ricardo"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Apellidos" los datos "Morales"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Correo Electrónico" los datos "qa.pruebasx01.autest.00@gmail.com"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Celular" los datos "123"
    Then   Muestra el mensaje de "Teléfono mínimo de 10 dígitos"
    And    Limpio el campo "Celular"
    When   Ingreso en el campo "Celular" los datos "1111111111111111"
    Then   Muestra el mensaje de "Ingresa un número válido"
    And    Limpio el campo "Celular"
    And    Doy click en el botón "arrow_forward"
    Then   Muestra el mensaje de "Este campo es requerido"

  Scenario: Campo contraseña

    Given  Estoy en la pagina de registro
    When   Ingreso en el campo "Nombre" los datos "Ricardo"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Apellidos" los datos "Morales"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Correo Electrónico" los datos "qa.pruebasx01.autest.00@gmail.com"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Celular" los datos "9987345421"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Contraseña" los datos "ges"
    Then   Muestra el mensaje de "Debes utilizar al menos 8 caracteres"
    And    Limpio el campo "Contraseña"
    When   Ingreso en el campo "Contraseña" los datos "gestionix"
    Then   Muestra el mensaje de "Debes utilizar al menos una letra mayúscula"
    And    Limpio el campo "Contraseña"
    When   Ingreso en el campo "Contraseña" los datos "Gestionix"
    Then   Muestra el mensaje de "Debes utilizar al menos un número"
    And    Limpio el campo "Contraseña"
    When   Ingreso en el campo "Contraseña" los datos "Gestionix88"
    And    Doy click en el botón "visibility"
    Then   Veo la contraseña "Gestionix88"
    And    Limpio el campo "Contraseña"
    And    Doy click en el botón "arrow_forward"
    Then   Muestra el mensaje de "Este campo es requerido"


Scenario: Crear un  usuario

    Given  Estoy en la pagina de registro
    When   Ingreso en el campo "Nombre" los datos "Ricardo"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Apellidos" los datos "Morales"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso un correo aleatorio
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso celular aleatorio
    And    Ingreso el codigo del pais "+380"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Contraseña" los datos "Gestionix01"
    And   Doy click en el botón "arrow_forward"
    Then    Puedo ver la pagina de Dashboard
  
Scenario: Usuario ya existente

    Given  Estoy en la pagina de registro
    When   Ingreso en el campo "Nombre" los datos "Ricardo"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Apellidos" los datos "Morales"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Correo Electrónico" los datos "qa.pruebasx01.autest.00@gmail.com"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso celular aleatorio
    And    Ingreso el codigo del pais "+380"
    Then   Doy click en el botón "arrow_forward"
    When   Ingreso en el campo "Contraseña" los datos "Gestionix01"
    And    Doy click en el botón "arrow_forward"
    Then   Muestra el mensaje de "Ya existe un usuario con el email indicado"
    


  
