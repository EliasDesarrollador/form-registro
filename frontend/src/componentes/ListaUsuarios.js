

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarUsuario from './EditarUsuario';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditar, setUsuarioEditar] = useState(null); // Usuario seleccionado para editar

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
  axios.get('http://localhost:3001/api/usuarios')
    .then(res => {
      console.log("Usuarios cargados:", res.data); // 👈 debug
      setUsuarios(res.data);
    })
    .catch(err => console.error("Error al traer usuarios:", err));
};


  return (
    <div>
      <h2>Editar Usuario</h2>
      <table border="1" cellPadding="5">
    
        <tbody>
          {usuarios.map(u => (
            <React.Fragment key={u.id}>
              <tr>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                  <td>{u.correo}</td>
 
                <td>
                  <button onClick={() => setUsuarioEditar(u)}>Editar</button>
                </td>
              </tr>

              {/* Si este usuario es el que estamos editando, mostrar el formulario debajo */}
              {usuarioEditar && usuarioEditar.id === u.id && (
                <tr>
                  <td colSpan="4">
                    <EditarUsuario 
                      usuario={usuarioEditar} 
                      onActualizar={() => {
                        setUsuarioEditar(null); // cerrar el formulario
                        cargarUsuarios(); // recargar la lista
                      }} 
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUsuarios;
