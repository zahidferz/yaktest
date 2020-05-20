Feature: De_002LoginNat

   Login sin ningun tipo de restricción tal cual lo hace un usuauario.

Scenario: Login Natural

      Given Estoy en la pagina de login
      And   Ingreso los datos
            |      Campo             |              Valor                |
            |   Correo Electrónico   |    qa.pruebasx01+001@gmail.com    |
            |   Contraseña           |             Gestionix01           |
      And   Doy click en el botón "Entrar"
      Then  Veo la pantalla de Dasboard
