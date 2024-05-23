import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from 'react-bootstrap';

const RegistrarAlumno = ({ handleCloseRegistro }) => {
    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [show, setShow] = useState(true);

    const handleRegistrar = async (e) => {
        e.preventDefault();
        try {
            const registro = await axios.post(
                "http://localhost:3000/api_socket/Alumno/crearAlumno",
                {
                    nombre,
                    contrasena
                }
            );
            console.log(registro);
            console.log(registro.data.message);

            if (registro.data.message === "Alumno registrado") {
                alert("Alumno registrado");
                setNombre("");
                setContrasena("");
                setShow(false);
            } else {
                alert("Alumno no registrado");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={show} onHide={handleCloseRegistro} centered>
            <Modal.Header closeButton style={{ backgroundColor: "#151313", color: '#FFFFFF' }}>
                <Modal.Title>Registro de Alumno</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: "#151313", color: '#FFFFFF' }}>
                <Form onSubmit={handleRegistrar}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Ingresar Alumno</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Alumno"
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
                    <Button variant="danger" onClick={handleCloseRegistro}>
                        Cerrar
                    </Button>{' '}
                    <Button variant="primary" onClick={handleRegistrar}>
                        Registrar
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>
    );
};

export default RegistrarAlumno;