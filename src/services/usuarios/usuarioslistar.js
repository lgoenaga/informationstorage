import { useState, useEffect } from "react";
import { listUsuarios } from "../../routes/usuarios";

import TableUsuarios from "./usuariostable";

export const ListUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    let _header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let tokenAuthorization = localStorage.getItem("Authorization");

    if (tokenAuthorization) {
      _header.headers["Authorization"] = tokenAuthorization;
    }

    const mostrarUsuarios = async () => {
      try {
        let { data } = await listUsuarios(_header);
        setUsuarios(data);
      } catch (error) {
        console.log(
          "Error desde el servidor verificar backend  listar usuarios",
          error
        );
      }
    };

    mostrarUsuarios();
  }, []);

  const DataTable = () => {
    let noReg = 1;

    return usuarios.map((res, i) => {
      res.noReg = noReg++;
      return <TableUsuarios obj={res} key={i} />;
    });
  };

  return (
    <div>
      <table className="table border-primary  table-hover">
        <thead className="table-group-divider">
          <tr className="table-info">
            <th scope="col">#</th>
            <th scope="col">Usuario</th>
            <th scope="col">Rol</th>
            <th scope="col">Estado</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">{DataTable()}</tbody>
      </table>
    </div>
  );
};
