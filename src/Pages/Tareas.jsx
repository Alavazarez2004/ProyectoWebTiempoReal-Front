import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import axios from "axios";

const Tareas = () => {
    const [estadoTarea, setEstadoTarea] = useState("En preparación");
    const [actualizacion, setActualizacion] = useState(false);
    const [historialEstados, setHistorialEstados] = useState([]);

    const obtenerEstadoTarea = async () => {
        try {
            const response = await axios.get("http://localhost:3000/estado-Tareas");
            if (response.status === 200) {
                const data = response.data;
                setEstadoTarea(data.estado);
                setHistorialEstados(prevHistorial => [...prevHistorial, data.estado]); 
                setActualizacion(true);
            } else {
                console.error("Error al obtener el estado de la tarea:", response.statusText);
            }
        } catch (error) {
            console.error("Error al obtener el estado de la tarea:", error);
        }
    };

    const cambiarEstadoEntregado = async () => {
        try {
            const response = await axios.post("http://localhost:3000/cambiar-estado-Tarea/Entregado");
            if (response.status === 200) {
                setActualizacion(true); 
            } else {
                console.error("Error al cambiar el estado del paquete:", response.statusText);
            }
        } catch (error) {
            console.error("Error al cambiar el estado del paquete:", error);
        }
    };

    const cambiarEstadoEnPreparacion = async () => {
        try {
            const response = await axios.post("http://localhost:3000/en-preparacion");
            if (response.status === 200) {
                setActualizacion(true); 
            } else {
                console.error("Error al cambiar el estado del paquete:", response.statusText);
            }
        } catch (error) {
            console.error("Error al cambiar el estado del paquete:", error);
        }
    };

    useEffect(() => {
        console.log("Ejecutando efecto de useEffect");
        const interval = setInterval(() => {
            obtenerEstadoTarea();
            setActualizacion(false);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <NavBar />
            <br></br>
            <br></br>
            <br></br>
            <h1>Tareas</h1>
            <div>Estado de la Tarea: {estadoTarea}</div>
            {actualizacion && <p>El estado de la Tarea se ha actualizado.</p>}

            <button onClick={cambiarEstadoEnPreparacion}>Subir Tarea</button>
            <button onClick={cambiarEstadoEntregado}>Entregar Tarea</button>

            <div>
                <h2>Historial de estados:</h2>
                <ul>
                    {historialEstados.map((estado, index) => (
                        <li key={index}>{estado}</li>
                    ))}
                </ul>
            </div>
            <Footer />
        </>
    );
};

export default Tareas;