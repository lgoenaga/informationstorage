import React from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

import { BsFillPenFill, BsFillTrashFill } from "react-icons/bs";
import { deleteCiudadano } from "../../routes/contactos";



const TableContactos = (props) => {
  const { noReg, identification, firstName, firstSurname, dateBirth } =
    props.obj;

  const navigate = useNavigate();

  const borrarContacto = async () => {
    let data = "";

    try {
      data = await deleteCiudadano(identification);

      console.log("Ciudadano Eliminado");
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log("Ciudadano no se ha podido eliminar", error);
    }
  };

  return (
    <>
      <tr className="fila-contactos">
        <td className="dato-contacto">{noReg}</td>
        <td className="dato-contacto">{identification}</td>
        <td className="dato-contacto">{firstName}</td>
        <td className="dato-contacto">{firstSurname}</td>
        <td className="dato-contacto">{dateBirth}</td>

        <td className="dato-contacto">
          <Button
            variant="danger"
            onClick={borrarContacto}
            className="botones-mod"
          >
            <BsFillTrashFill />
          </Button>
          <Button
            className="botones-mod"
            variant="info"
            onClick={() => navigate(`/contactos/${identification}`)}
          >
            <BsFillPenFill />
          </Button>
        </td>
      </tr>
    </>
  );
};

export default TableContactos;
