import React, { useState } from 'react';
import axios from 'axios';

const AgregarPersona = () => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api_socket/Persona/crearPersona', {
        nombre: nombre,
        categoria: categoria
      });

      if (response.data.success) {
        setSuccessMessage('Persona agregada exitosamente');
        setNombre('');
        setCategoria('');
      } else {
        setErrorMessage('Error al agregar persona');
      }
    } catch (error) {
      setErrorMessage('Error de red al intentar agregar persona');
      console.error('Error al agregar persona', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la persona"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categoria de la persona"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <button type="submit">Agregar Persona</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AgregarPersona;