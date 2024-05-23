import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom'; // Importa Navigate
import { Modal, Button, Form } from 'react-bootstrap';
import "../styles/Login.css";
import axios from "axios";
import Swal from 'sweetalert2';
import OldSchool from "../img/old-school.png";
import ModalRegistrar from '../Components/ModalRegistrar';

const NavbarGLobal = () => {
    const [show, setShow] = useState(false);
    const [showRegistro, setShowRegistro] = useState(false);
    const [nombre, setNombre] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [loggedIn, setLoggedIn] = useState(false); // Estado para redireccionar después de iniciar sesión

    useEffect(() => {
        const GuardarInicio = localStorage.getItem('isLoggedIn');
        if (GuardarInicio) {
            setNombre(localStorage.getItem('nombre'));
            setTipoUsuario(localStorage.getItem('tipo'));
        }
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseRegistro = () => setShowRegistro(false);
    const handleShowRegistro = () => setShowRegistro(true);

    const handleIniciarSesion = async (e) => {
        e.preventDefault();
        console.log(nombre);
        try {
            // Primero intentamos iniciar sesión como alumno
            const resAlumno = await axios.get(
                `http://localhost:3000/api_socket/Alumno/buscar?nombre=${nombre}&contrasena=${contrasena}`,
            );
            console.log(resAlumno.data.message);

            if (resAlumno.data.message === "Alumno encontrado") {
                Swal.fire({
                    icon: "success",
                    text: `Bienvenido ${tipoUsuario} ${nombre}`
                });
                setTipoUsuario('alumno');
                localStorage.setItem('nombre', resAlumno.data.alumno.nombre);
                localStorage.setItem('tipo', "alumno");
                setNombre(resAlumno.data.alumno.nombre);
                setContrasena("");
                handleClose(true);
                setLoggedIn(true); // Cambia el estado a true para redirigir al usuario
                return; // Salimos de la función si iniciamos sesión como alumno
            }
    
            // Si no iniciamos sesión como alumno, intentamos como maestro
            const resMaestro = await axios.get(
                `http://localhost:3000/api_socket/Maestro/buscar?nombre_maestro=${nombre}&contrasena_maestro=${contrasena}`,
            );
            console.log(resMaestro.data.message);
            if (resMaestro.data.message === "Maestro encontrado") {
                Swal.fire({
                    icon: "success",
                    text: `Bienvenido ${tipoUsuario} ${nombre}`
                });
                localStorage.setItem('nombre', nombre);
                setNombre(resMaestro.data.maestro.nombre);
                localStorage.setItem('tipo', "maestro");
                setTipoUsuario('maestro');
                setContrasena("");
                handleClose(true);
                setLoggedIn(true); // Cambia el estado a true para redirigir al usuario
                return; // Salimos de la función si iniciamos sesión como maestro
            }

            // Si no se encontró ni alumno ni maestro
            Swal.fire({
                icon: "error",
                text: "Usuario no registrado"
            });
    
        } catch (error) {
            console.log(error);
        }
    };

    if (loggedIn) {
        return <Navigate to="/Inicio" />;
    }

    return (
        <>
            <header>
                <nav className="Container">
                    <div className="Logo">
                        <img src={OldSchool} alt="" />
                    </div>

                    <div className="Login">
                        <label onClick={handleShow}>Ingresar</label>{' '}
                        <label onClick={handleShowRegistro}>Registrar</label>
                        {showRegistro && <ModalRegistrar handleCloseRegistro={handleCloseRegistro} />}
                    </div>
                </nav>
            </header>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#151313", color: '#FFFFFF' }}>
                    <Modal.Title>Inicio de sesión</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ backgroundColor: "#151313", color: '#FFFFFF' }}>
                    <Form onSubmit={handleIniciarSesion}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Ingresar Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Ingresar Contraseña</Form.Label>
                            <Form.Control
                                type="Password"
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="danger" onClick={handleClose}>
                            Cerrar
                        </Button>{' '}
                        <Button variant="primary" onClick={handleIniciarSesion}>
                            Ingresar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default NavbarGLobal;
