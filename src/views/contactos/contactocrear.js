import React from "react";
import { CrearRegistroCiudadano } from "../../services/contactos/contactocrear";
import BarraNavegacion from "../../components/header";
import Footer from "../../components/footer";


const ViewRegistroCiudadano = () => {
  return (
    <>
      <BarraNavegacion />
      <CrearRegistroCiudadano />
      <Footer />
    </>
  );
};

export default ViewRegistroCiudadano;
