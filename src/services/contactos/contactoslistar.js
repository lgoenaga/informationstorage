import { useState, useEffect } from "react";
import { listCiudadanos } from "../../routes/contactos";
import TableContactos from "./contactostable";
import Swal from "sweetalert2";

import "../../css/registrociudadano.css"

import { AuthHeaders } from "../../components/authheader";


export const ListCiudadanos = () => {
  const [ciudadanos, setCiudadanos] = useState([]);
useEffect(() => {
  const mostrarCiudadanos = async () => {
    try {
      const authheader = AuthHeaders();
      const { data } = await listCiudadanos(authheader);
      setCiudadanos(data);
    } catch (error) {
      console.log("Error desde el servidor verificar backend ", error);
    }
  };

     Swal.fire({
       icon: "info",
       title: "Listando contactos",
       showConfirmButton: false,
       timer: 1000,
       didOpen: () => {
         Swal.showLoading();
       },
     });
     setTimeout(() => {
       Swal.close();
       mostrarCiudadanos();
     }, 1000);


  
}, []);




  const DataTable = () => {
    let noReg = 1;

    return ciudadanos.map((res, i) => {
      res.noReg = noReg++;
      return <TableContactos obj={res} key={i} />;
    });
  };

  return (
    <div>
      <table className="table border-primary table-hover table-contactos">
        <thead className="table-group-divider">
          <tr className="table-info">
            <th scope="col" className="col-contactos">
              #
            </th>
            <th scope="col" className="col-contactos">
              Identificacion
            </th>
            <th scope="col" className="col-contactos">
              Primer Nombre
            </th>
            <th scope="col" className="col-contactos">
              Primer Apellido
            </th>
            <th scope="col" className="col-contactos">
              Fecha Nacimiento
            </th>
            <th scope="col" className="col-contactos">
              Acción
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">{DataTable()}</tbody>
      </table>
    </div>
  );
};
