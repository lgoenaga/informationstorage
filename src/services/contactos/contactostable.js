import React from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { BsFillPenFill, BsFillTrashFill } from "react-icons/bs";
import { deleteCiudadano } from "../../routes/contactos";

import { AuthHeaders } from "../../components/authheader";

const TableContactos = (props) => {
  const { noReg, identification, firstName, firstSurname, dateBirth } =
    props.obj;

  const navigate = useNavigate();

  const borrarContacto = async () => {
    Swal.fire({
      title: "Desea eliminar el usuario? ",
      html: "Deleting will be canceled in 10 <strong></strong> seconds.",
      timer: 10000,
      timerProgressBar: true,
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Not delete",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const authheader = AuthHeaders();
          await deleteCiudadano(identification, authheader);

          Swal.fire({
            icon: "success",
            title: "Ciudadano Eliminado",
            showConfirmButton: false,
            timer: 2000,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          setTimeout(() => {
            Swal.close();
            window.location.reload();
          }, 2000);
        } else {
          if (result.isDenied) {
            Swal.fire({
              icon: "info",
              title: "Ciudadano no ha sido Eliminado",
              showConfirmButton: false,
              timer: 2000,
              didOpen: () => {
                Swal.showLoading();
              },
            });
            setTimeout(() => {
              Swal.close();
            }, 2000);
          }
        }
        if (result.dismiss === Swal.DismissReason.timer) {
          Swal.fire({
            icon: "error",
            title: "Se ha superado el tiempo sin una respuesta",
            showConfirmButton: false,
            timer: 2000,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          setTimeout(() => {
            Swal.close();
          }, 2000);
        }
      } catch (error) {
        let mensaje;
        mensaje = error.response.data;

        Swal.fire({
          icon: "error",
          title: mensaje,
          showConfirmButton: false,
          timer: 2000,
        });
        Swal.showLoading();
      }
    });
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
            className="botones-mod"
            variant="btn btn-outline-info"
            onClick={() => navigate(`/contactos/${identification}`)}
          >
            <BsFillPenFill />
          </Button>
          <Button
            variant="btn btn-outline-danger"
            onClick={borrarContacto}
            className="botones-mod"
          >
            <BsFillTrashFill />
          </Button>
        </td>
      </tr>
    </>
  );
};

export default TableContactos;
