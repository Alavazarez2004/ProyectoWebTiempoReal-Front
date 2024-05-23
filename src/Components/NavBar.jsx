import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import OldSchool from "../img/old-school.png";
import { NavLink, useNavigate  } from "react-router-dom";
import { Button } from 'react-bootstrap';

const NavbarGLobal = () => {
    const [nombre, setNombre] = useState("");
    const navigate = useNavigate();
    const [setTipoUsuario] = useState("");
    
    useEffect(()=>{
        const GuardarInicio = localStorage.getItem('isLoggedIn');
        if(GuardarInicio){
            setNombre(localStorage.getItem('nombre'));
            setTipoUsuario(localStorage.getItem('tipo'));
        }
    });

    const handleCerrarSesion = () => {
        console.log("Cerrando sesión...");
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('nombre');
        setNombre("");
        console.log("Sesión cerrada.");
        navigate('/');
    }
    
    
    return (
        <>
            <header className="NavbarGlobal">
                <nav className="navGlobal">
                <div className="spNombreLogo">
                    <NavLink to="/Inicio">
                        <img src={OldSchool} alt="" />
                    </NavLink>
                </div>

                    <div className="containerPuntos">
                        <ul className="listaNav">
                            {localStorage.getItem('tipo') === "alumno" && (
                                <>
                                    <NavLink to="/Maestros" className="links">
                                        Maestros
                                    </NavLink>
                                </>
                            )}
                            {localStorage.getItem('tipo') === "maestro" && (
                                <>
                                    <NavLink to="/Alumnos" className="links">
                                        Alumnos
                                    </NavLink>
                                </>
                            )}
                            <NavLink to="/Tareas" className="links">
                                Tareas
                            </NavLink>

                            <NavLink to="/Home" className="links">
                                Home
                            </NavLink>

                            <NavLink to="/Chat" className="links">
                                Chat
                            </NavLink>
                        </ul>
                    </div>

                    <div className="containerSesion">
                        <span>Hola {localStorage.getItem('nombre')} {nombre}</span>{" "} {/* Use nombre state here */}
                        <Button variant="danger" onClick={handleCerrarSesion}>
                            Cerrar Sesión
                        </Button>
                    </div>
                </nav>
            </header>
        </>
    );
}
export default NavbarGLobal;