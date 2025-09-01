
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarUsuario = ({ usuario, onActualizar }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setCorreo(usuario.correo); // 👈 usamos "correo"
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/usuario/${usuario.id}`, { nombre, correo }); // 👈 usamos "correo"
      setMensaje('Usuario actualizado exitosamente');
      onActualizar(); // refresca lista
    } catch (error) {
      setMensaje('Error al actualizar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Correo:</label>
        <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} />
      </div>
      <button type="submit">Actualizar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default EditarUsuario;
