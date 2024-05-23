import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Inicio from './Pages/Inicio.jsx';
import Maestros from './Pages/Maestros.jsx';
import Alumnos from './Pages/Alumnos.jsx';
import Tareas from './Pages/Tareas.jsx';
import Home from "./Components/Home";
import ChatRoom from './Components/ChatRoom.jsx';
import Chat from './Components/ChatRoom.jsx';
import AgregarPersona from './Components/AgregarPersona.jsx';


function App() {
    return (
      <Router>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/Inicio" element={<Inicio />} />
            <Route exact path="/Maestros" element={<Maestros />} />
            <Route exact path="/Alumnos" element={<Alumnos />} />
            <Route exact path="/Tareas" element={<Tareas />} />
            <Route exact path="/Home" Component={Home} />
            <Route path="/room/:roomId" Component={ChatRoom} />
            <Route exact path="/Chat" element={<Chat />} />
            <Route exact path="/AgregarRepartidor" element={<AgregarPersona />} />
        </Routes>
    </Router>
  );
}
  export default App;