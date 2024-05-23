import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import axios from "axios";
import "../styles/Alumnos.css";

const Alumnos = () => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        const fetchMaestros = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api_socket/Alumno/visualizarAlumnos");
                setAlumnos(response.data); // Actualiza el estado con los datos de los alumnos
            } catch (error) {
                console.error("Error al obtener la lista de alumnos:", error);
            }
        };

        fetchMaestros();
    }, []); // Se ejecuta solo una vez al cargar el componente

    return (
        <>
            <NavBar />
            <div className="table-container">
            <br />
            <br />
            <br />
            <br />
                <h1>Lista de Alumnos</h1>
                <table className="alumnos-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Contraseña</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map((alumnos) => (
                            <tr key={alumnos.id_alumno}>
                                <td>{alumnos.id_alumno}</td>
                                <td>{alumnos.nombre}</td>
                                <td>{alumnos.contrasena}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default Alumnos;