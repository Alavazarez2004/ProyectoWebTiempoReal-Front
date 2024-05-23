import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from 'react-bootstrap';

const RegistrarMaestro = ({ handleCloseRegistro }) => {
    const [nombre_maestro, setNombre_Maestro] = useState("");
    const [contrasena_maestro, setContrasena_Maestro] = useState("");
    const [show, setShow] = useState(true);

    const handleRegistrar = async (e) => {
        e.preventDefault();
        try {
            const registro = await axios.post(
                "http://localhost:3000/api_socket/Maestro/crearMaestro",
                {
                    nombre_maestro,
                    contrasena_maestro
                }
            );
            console.log(registro);
            console.log(registro.data.message);

            if (registro.data.message === "Maestro registrado") {
                alert("Maestro registrado");
                setNombre_Maestro("");
                setContrasena_Maestro("");
                setShow(false);
            } else {
                alert("Maestro no registrado");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={show} onHide={handleCloseRegistro} centered>
            <Modal.Header closeButton style={{ backgroundColor: "#151313", color: '#FFFFFF' }}>
                <Modal.Title>Registro de Maestro</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: "#151313", color: '#FFFFFF' }}>
                <Form onSubmit={handleRegistrar}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Ingresar Maestro</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Maestro"
                            value={nombre_maestro}
                            onChange={(e) => setNombre_Maestro(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Ingresar Contraseña</Form.Label>
                        <Form.Control
                            type="Password"
                            placeholder="Contraseña"
                            value={contrasena_maestro}
                            onChange={(e) => setContrasena_Maestro(e.target.value)}
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

export default RegistrarMaestro;
