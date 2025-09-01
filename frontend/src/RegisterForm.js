
import { useState, useEffect } from 'react';

export default function RegisterForm() {
  // Estados para los inputs
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [usuarios, setUsuarios] = useState([]); // Para mostrar la lista

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página recargue
    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo }) // Enviamos datos al backend
      });
      const data = await res.text();
      setMensaje(data); // Mostramos mensaje de éxito/error
      setNombre('');
      setCorreo('');
      fetchUsuarios(); // Actualizamos lista de usuarios
    } catch (error) {
      setMensaje('Error al registrar usuario');
    }
  };

  // Función para traer todos los usuarios
  const fetchUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:5000/usuarios'); // Ruta que vamos a crear
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Traer usuarios al cargar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}

      <h3>Lista de Usuarios</h3>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>{u.nombre} - {u.correo}</li>
        ))}
      </ul>
    </div>
  );
}
