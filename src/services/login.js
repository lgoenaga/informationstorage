import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import logo from "../img/logo.png";
import { valiteUser } from "../routes/login";

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [valoresForm, setValoresForm] = useState({});
  localStorage.clear();

  const { user = "", password = "" } = valoresForm;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const validarUsuario =  async () => {
    const { data } = await valiteUser(valoresForm);
    if (data) {
      console.log(data);
      console.log("Usuario autorizado");
      localStorage.setItem("Authorization", data.access_token);
      navigate("/inicio");
    } else {
      console.log("Datos no coinciden");
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    setValidated(true);

     validarUsuario();
  };

  return (
    <Container className="login-form container-fluid">
      <Col className="login-col">
        <Form
          className="FormLogin"
          noValidate
          validated={validated}
          onSubmit={(e) => handleOnSubmit(e)}
        >
          <Form.Group className="mb-3" controlId="formBasicUser">
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
              onChange={(e) => handleOnChange(e)}
              required
            />
            <Form.Text className="text-muted">
              Never share your password with anyone.
            </Form.Text>
          </Form.Group>

          <Form.Group className="button-login">
            <Button
              variant="primary"
              className="boton"
              type="submit"
              onClick={(e) => handleOnSubmit(e)}
            >
              Enviar
            </Button>
          </Form.Group>
        </Form>
      </Col>
      <Col className="login-col">
        <img className="LogoLogin " src={logo} alt="Logo" />
      </Col>
    </Container>
  );
}

export default Login;
