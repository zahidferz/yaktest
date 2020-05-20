Feature: Mo_002 Login

   Se realizan los diferentes escenarios en los cuales se puedeo no realizar un login
   correspondientes a lo desarrollado actualmente.

Scenario: No se ingresa usuario y contraseña

        Given Estoy en la pagina de login
        And   Doy click en el botón "Entrar"
        Then  Veo los "2" mensajes de "Este campo es requerido"

Scenario: Usuario y contraseña incorrectos

        Given Estoy en la pagina de login
        And   Ingreso los datos
            |      Campo             |              Valor             |
            |   Correo Electrónico   |    NoExiste.01@gestionix.mx    |
            |   Contraseña           |             123Laser:          |
        And   Doy click en el botón "Entrar"
        Then  Veo el mensaje "Usuario o contraseña inválida"

Scenario: Realizo un login correcto

        Given  Estoy en la pagina de login
        And    Ingreso los datos
            |      Campo             |              Valor                     |
            |   Correo Electrónico   |    qa.pruebasx01.autest.00@gmail.com   |
            |   Contraseña           |             Gestionix01                |
         And   Doy click en el botón "Entrar"
         Then  Veo la pantalla de Dasboard