import React from "react";


let correo = "luisgoenagap@gmail.com";
let names = "Luis Alberto Goenaga Peláez";

function Footer() {
  return (
    <>
      <footer className="footer-app">
       <nav className="navbar fixed-bottom">
          <p>Pagina Elaborada por : {names}</p>
          <p>correo electronico : {correo}</p>
          <p>Todos los derechos reservados</p>
      </nav>
      </footer>
    </>
  );
}

export default Footer;
