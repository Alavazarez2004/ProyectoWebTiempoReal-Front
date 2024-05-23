import React, { useState } from 'react';
import RegistrarAlumno from "./RegistrarAlumno";
import RegistrarMaestro from "./RegistrarMaestro";
import '../styles/Registrar.css';

const Registrar = () => {
    const [showAlumno, setShowAlumno] = useState(false);
    const [showMaestro, setShowMaestro] = useState(false);

    return (
        <div className="registrar-container">
            <button className="register-button" onClick={() => setShowAlumno(!showAlumno)}>Registrar Alumno</button>
            <button className="register-button" onClick={() => setShowMaestro(!showMaestro)}>Registrar Maestro</button>

            {showAlumno && <RegistrarAlumno onClose={() => setShowAlumno(false)} />}
            {showMaestro && <RegistrarMaestro onClose={() => setShowMaestro(false)} />}
        </div>
    );
}

export default Registrar;
