import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import axios from "axios";
import "../styles/Maestros.css";

const Maestros = () => {
    const [maestros, setMaestros] = useState([]);

    useEffect(() => {
        const fetchMaestros = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api_socket/Maestro/visualizarMaestros");
                setMaestros(response.data); // Actualiza el estado con los datos de los maestros
            } catch (error) {
                console.error("Error al obtener la lista de maestros:", error);
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
                <h1>Lista de Maestros</h1>
                <table className="maestros-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Contraseña</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maestros.map((maestro) => (
                            <tr key={maestro.id_maestro}>
                                <td>{maestro.id_maestro}</td>
                                <td>{maestro.nombre_maestro}</td>
                                <td>{maestro.contrasena_maestro}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default Maestros;