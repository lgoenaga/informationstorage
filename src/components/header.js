import React from "react";
import logo from "../img/logo.png";
import { VscSettingsGear } from "react-icons/vsc";
import { FaRegAddressCard, FaRegCalendarPlus } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MdOutlineHowToVote, MdSupervisorAccount } from "react-icons/md";

function BarraNavegacion() {
  return (
    <header className="header-navbar">
      <div className="row-one">
        <div className="col-one-img">
          <a title="Administracion" href="/">
            <img
              className="BrandLogo"
              src={logo}
              alt="Logo"
              width="80"
              height="40"
            />
          </a>
        </div>
        <div className="col-two-navbar">
          <Navbar
            collapseOnSelect
            expand="lg"
            bg="light"
            variant="light"
            className="menuNavbar"
          >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown
                  title=<span>
                    <VscSettingsGear /> Usuarios
                  </span>
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/usuarios">
                    Listar Usuario
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/usuarios/crear">
                    Crear Usuario
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
                <Nav.Link href="/contactos/crear">
                  {" "}
                  <FaRegAddressCard /> Registro Ciudadano
                </Nav.Link>
                <Nav.Link href="/lugarvotacion">
                  <MdOutlineHowToVote /> Lugar de Votación
                </Nav.Link>
                <NavDropdown
                  title=<span>
                    <MdSupervisorAccount /> Gestionar Ciudadanos
                  </span>
                  id="collasible-nav-dropdown2"
                >
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/contactos">
                    Listar Ciudadano
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/Contactos/contactar">
                    Contactar Ciudadano
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>

                <Nav.Link href="/asistencia">
                  <FaRegCalendarPlus /> Registro de Asistencia
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
      <div>
        <div className="separatorNavbar"></div>
      </div>
    </header>
  );
}

export default BarraNavegacion;
