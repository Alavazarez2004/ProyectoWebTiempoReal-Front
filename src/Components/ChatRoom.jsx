import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useChat from "../useChat";
import NavBar from "./NavBar";
import Footer from "../Components/Footer";
import '../styles/Chat.css';

const ChatRoom = () => {
    const { roomId } = useParams();
    const { messages, sendMessage } = useChat(roomId);
    const [newMessage, setNewMessage] = useState("");

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    }

    const handleSendMessage = () => {
        sendMessage(newMessage);
        console.log(newMessage);
        console.log(roomId);
        setNewMessage("");
    }


    return (
        <>
            <NavBar />
            <div className="chat-room-container">
            <h1>Room: {roomId}</h1>
            <div className="messages-container">
                <ol className="messages-list">
                    {messages.map((message, i) => (
                        <li
                            key={i}
                            className={`message-item ${
                                message.ownedByCurrentUser ? "my-message" : "received-message"
                            }`}
                        >
                            {message.body}
                        </li>
                    ))}
                </ol>
            </div>
            <textarea
                value={newMessage}
                onChange={handleNewMessageChange}
                placeholder="Enter message"
                className="new-message-input-field"
            ></textarea>
            <button onClick={handleSendMessage} className="send-message-button">Enviar</button>
        </div>
        <Footer />
        </>
    );
}

export default ChatRoom;













/*https://www.youtube.com/watch?v=Yi2crLU9WA0&t=2236s
import React, {useEffect,useState} from "react";
import io from 'socket.io-client';
import NavBar from "./NavBar";
import axios from "axios";
import '../styles/Chat.css'

const Chat= ()=>{
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [nombre, setNombre] = useState("");
    const socket = io('http://localhost:3000', { transports: ['websocket'], withCredentials: false });
  
    useEffect(() => {
        const UsuarioIniciado = localStorage.getItem('nombre');
        if (UsuarioIniciado) {
            setNombre(UsuarioIniciado);
        }
        
        socket.on('chat message', (message) => {
            console.log('Mensaje recibido:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    
        return () => {
            socket.off();
        };
    });
  
    const handleSendMessage = async (e) => {
        e.preventDefault();
        const message = `${nombre}: ${messageInput}`;
        console.log(nombre);
        console.log(messageInput);
        try {
            const mensage = await axios.post(
                "http://localhost:3000/api_socket/Mensaje/guardarMensaje",
                {
                    nombre,
                    messageInput
                }
            );
            console.log(mensage);
            console.log(mensage.data.message);
            socket.emit('chat message', message); // También puedes emitir el mensaje al socket si deseas mostrarlo en tiempo real
            setMessageInput('');
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
    };
    
    
    return(
        <>
            <NavBar/>
            <div className="containerGlobalChat">
                <div className="ul-mensajes">
                    <ul>
                        {messages.map((message, index) => (
                        <li  className="li-mensajes" key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={handleSendMessage} className="formMensajes">
                    <input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    );
}

export default Chat;*/