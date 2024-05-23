import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/NavBar";
import AgregarPersona from "../Components/AgregarPersona";
import Footer from "../Components/Footer";

const Inicio = () => {
  const [obtenerPersonas, setObtenerPersonas] = useState([]);

  const getPersonas = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api_socket/Persona/conseguirPersona"
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
      const data = await res.json();
      setObtenerPersonas(data.personas);
    } catch (error) {
      console.error("Error al obtener personas", error);
    }
  };

  const longPolling = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api_socket/Persona/ObtenerPersonaNueva"
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
      const data = await res.json();
      setObtenerPersonas(data.personas);
     
    } catch (error) {
      console.error("Error al recibir notificación", error);
    }finally{
      longPolling();
    }
  };

  useEffect(() => {
    getPersonas();
  }, []);

  useEffect(() => {
    longPolling();
  },);

  return (
    <>
      <Navbar />
      <Outlet />
      <div><br/><br/><br/><br/>
        <h1>Personas Disponibles y Nuevas</h1>
        <ul>
          {obtenerPersonas.length > 0 ? (
            obtenerPersonas.map((personas, i) => (
              <div key={i}>
                <li>{personas.nombre}</li>
              </div>
            ))
          ) : (
            <p>No hay personas disponibles.</p>
          )}
        </ul>
        <AgregarPersona />
      </div>
      <Footer />
    </>
  );
}

export default Inicio;