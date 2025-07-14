import { success, error } from "../red/respuestas.js";
import { conexion } from "../db.js";

// Obtener todos los contactos del usuario autenticado
export const getContactos = (req, res) => {
  const id_usuario = req.user.id_usuario; // Esto viene del JWT middleware

  conexion.query('SELECT * FROM tbl_contactos WHERE id_usuario = ?', [id_usuario], (err, rows) => {
    if (err) {
      console.error('[DB ERROR]', err);
      return error(req, res, 'Error al obtener los contactos');
    }
    success(req, res, rows);
  });
};

// Obtener un solo contacto (verifica que sea del usuario)
export const getContacto = (req, res) => {
  const { id_contacto } = req.params;
  const id_usuario = req.user.id_usuario;

  conexion.query('SELECT * FROM tbl_contactos WHERE id_contacto = ? AND id_usuario = ?', [id_contacto, id_usuario], (err, rows) => {
    if (err) return error(req, res, 'Error al obtener el contacto');
    if (rows.length === 0) return error(req, res, 'Contacto no encontrado o no autorizado', 404);
    success(req, res, rows[0]);
  });
};

// Crear nuevo contacto
export const createContacto = (req, res) => {
  const { nombre, apellido, telefono, correo, id_categoria } = req.body;
  const id_usuario = req.user.id_usuario;

  if (!nombre || !telefono) {
    return error(req, res, 'Nombre y teléfono son requeridos', 400);
  }

  const datos = [nombre, apellido, telefono, correo, id_usuario, id_categoria];
  conexion.query(
    'INSERT INTO tbl_contactos (nombre, apellido, telefono, correo, id_usuario, id_categoria) VALUES (?, ?, ?, ?, ?, ?)',
    datos,
    (err, result) => {
      if (err) return error(req, res, 'Error al crear contacto');
      success(req, res, { id: result.insertId, nombre }, 201);
    }
  );
};

// Actualizar contacto
export const updateContacto = (req, res) => {
  const { id_contacto } = req.params;
  const { nombre, apellido, telefono, correo, id_categoria } = req.body;
  const id_usuario = req.user.id_usuario;

  if (!nombre || !telefono) {
    return error(req, res, 'Nombre y teléfono son requeridos', 400);
  }

  // Verifica si el contacto pertenece al usuario
  conexion.query('SELECT * FROM tbl_contactos WHERE id_contacto = ? AND id_usuario = ?', [id_contacto, id_usuario], (err, rows) => {
    if (err) return error(req, res, 'Error al verificar contacto');
    if (rows.length === 0) return error(req, res, 'No autorizado para modificar este contacto', 403);

    const datos = [nombre, apellido, telefono, correo, id_categoria, id_contacto];
    conexion.query(
      `UPDATE tbl_contactos 
       SET nombre = ?, apellido = ?, telefono = ?, correo = ?, id_categoria = ? 
       WHERE id_contacto = ?`,
      datos,
      (err2) => {
        if (err2) return error(req, res, 'Error al actualizar el contacto');
        success(req, res, { mensaje: 'Contacto actualizado' });
      }
    );
  });
};

// Eliminar contacto
export const deleteContacto = (req, res) => {
  const { id_contacto } = req.params;
  const id_usuario = req.user.id_usuario;

  // Verifica si pertenece al usuario
  conexion.query('SELECT * FROM tbl_contactos WHERE id_contacto = ? AND id_usuario = ?', [id_contacto, id_usuario], (err, rows) => {
    if (err) return error(req, res, 'Error al verificar contacto');
    if (rows.length === 0) return error(req, res, 'No autorizado para eliminar este contacto', 403);

    conexion.query('DELETE FROM tbl_contactos WHERE id_contacto = ?', [id_contacto], (err2) => {
      if (err2) return error(req, res, 'Error al eliminar el contacto');
      success(req, res, { mensaje: 'Contacto eliminado' });
    });
  });
};
