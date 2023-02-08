import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

import { updateUsuario, getUsuario } from "../../routes/usuarios";

export const UpdateRegistroUsuario = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { userLogin } = useParams();

  const [valoresForm, setValoresForm] = useState({});

  const [usuario, setUsuario] = useState({});

  const { user = "", password = "", rol = "", estado = "" } = valoresForm;

  useEffect(() => {
    const mostrarusuario = async () => {
      let _header = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let tokenAuthorization = localStorage.getItem("Authorization");

      if (tokenAuthorization) {
        _header.headers["Authorization"] = tokenAuthorization;
      }

      try {
        const { data } = await getUsuario(userLogin, _header);
        setUsuario(data);
      } catch (error) {
        console.log("Usuario no existe");
      }
    };
    mostrarusuario();
  }, [userLogin]);

  useEffect(() => {
    setValoresForm({
      user: usuario.user,
      password: "",
      rol: usuario.rol,
      estado: usuario.estado,
    });
  }, [usuario]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const usuario = {
      user,
      password,
      rol,
      estado,
    };

    let data = "";
    try {
      data = await updateUsuario(userLogin, usuario);
      console.log("Usuario actualizado correctamente");
      console.log(data);
      navigate("/usuarios");
    } catch (error) {
      console.log("Usuario no se pudo actualizar");
    }
  };

  return (
    <>
      <Container className="contenedor-usuarios container-fluid">
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleOnSubmit(e)}
        >
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrar Usuario"
              name="user"
              value={user}
              onChange={(e) => handleOnChange(e)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              minLength="6"
              onChange={(e) => handleOnChange(e)}
              required
            />
          </Form.Group>
          <Form.Text className="text-muted">
            Never share your password with anyone.
          </Form.Text>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrar un Rol"
              name="rol"
              value={rol}
              onChange={(e) => handleOnChange(e)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrar un estado"
              name="estado"
              value={estado}
              onChange={(e) => handleOnChange(e)}
              required
            />
          </Form.Group>
          <Form.Group className="d-flex">
            <Button variant="primary" onClick={(e) => handleOnSubmit(e)}>
              Actualizar
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};
