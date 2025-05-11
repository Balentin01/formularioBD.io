const api = 'http://localhost:3000/api/usuarios';

const form = document.getElementById('formulario');
const tabla = document.querySelector('#tablaUsuarios tbody');
const idInput = document.getElementById('id');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const datos = {
    nombre: nombreInput.value,
    email: emailInput.value
  };

  const id = idInput.value;
  if (id) {
    await fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
  } else {
    await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
  }

  form.reset();
  idInput.value = '';
  cargarUsuarios();
});

async function cargarUsuarios() {
  const res = await fetch(api);
  const usuarios = await res.json();
  tabla.innerHTML = ''; // limpia la tabla

  usuarios.forEach(u => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${u.id}</td>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>
        <button onclick="editar(${u.id}, '${u.nombre}', '${u.email}')">Editar</button>
        <button onclick="eliminar(${u.id})">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

function editar(id, nombre, email) {
  idInput.value = id;
  nombreInput.value = nombre;
  emailInput.value = email;
}

async function eliminar(id) {
  if (confirm('¿Eliminar usuario?')) {
    await fetch(`${api}/${id}`, { method: 'DELETE' });
    cargarUsuarios();
  }
}

cargarUsuarios();