import { useState, useEffect } from "react";
import { listUsuarios } from "../../routes/usuarios";
import { AuthHeaders } from "../../components/authheader";
import Swal from "sweetalert2";

import TableUsuarios from "./usuariostable";

export const ListUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageActual, setPageActual] = useState(1);

  useEffect(() => {
    const mostrarUsuarios = async () => {
      try {
        const authheader = AuthHeaders();
        let { data } = await listUsuarios(authheader);
        setUsuarios(data);
      } catch (error) {
        console.log(
          "Error desde el servidor verificar backend  listar usuarios",
          error
        );
      }
    };

    Swal.fire({
      icon: "info",
      title: "Listando usuarios",
      showConfirmButton: false,
      timer: 1000,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      Swal.close();
      mostrarUsuarios();
    }, 1000);
  }, []);

  const btnnext = document.getElementById("btn-next");
  const btnpreview = document.getElementById("btn-preview");
  let page = usuarios.length / 12;

  if (page - Math.trunc(page) > 0) {
    page = Math.trunc(page) + 1;
  }

  const nextPage = () => {
    if (page > pageActual) {
      setPageActual(pageActual + 1);
      setCurrentPage(currentPage + 12);
      btnpreview.disabled = false;
      btnnext.disabled = false;
      console.log(pageActual);
    } else {
      btnnext.disabled = true;
      btnpreview.disabled = false;
    }
  };

  const previewPage = () => {
    console.log(pageActual);
    if (pageActual > 1) {
      setPageActual(pageActual - 1);
      setCurrentPage(currentPage - 12);
      btnnext.disabled = false;
      btnpreview.disabled = false;
      console.log(pageActual);
    } else {
      btnnext.disabled = false;
      btnpreview.disabled = true;
    }
  };

  const DataTable = () => {
    let noReg = 1;

    return usuarios
      .map((res, i) => {
        res.noReg = noReg++;
        if (res.user !== "administrador") {
          return <TableUsuarios obj={res} key={i} />;
        } else {
          return null;
        }
      })
      .slice(currentPage, currentPage + 12);
  };

  return (
    <div>
      <div className="paginacion">
        <button
          className="btn btn-primary btn-preview"
          id="btn-preview"
          onClick={previewPage}
        >
          preview
        </button>
        &nbsp;
        <p>Pagina {pageActual} de {page}</p>
        &nbsp;
        <button className="btn btn-primary" id="btn-next" onClick={nextPage}>
          next
        </button>
      </div>
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
