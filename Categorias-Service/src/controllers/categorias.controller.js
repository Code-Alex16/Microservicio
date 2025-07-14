import { success, error } from "../red/respuesta.js";
import { conexion } from "../db.js";

// Obtener todas las categorías
export const getCategorias = (req, res) => {
  conexion.query('SELECT * FROM tbl_categorias', (err, rows) => {
    if (err) {
      console.error('[DB ERROR]', err);
      return error(req, res, 'Error al obtener las categorías');
    }
    success(req, res, rows);
  });
};

// Obtener una categoría por ID
export const getCategoria = (req, res) => {
  const { id_categoria } = req.params;
  conexion.query('SELECT * FROM tbl_categorias WHERE id_categoria = ?', [id_categoria], (err, rows) => {
    if (err) {
      console.error('[DB ERROR]', err);
      return error(req, res, 'Error al obtener la categoría');
    }
    if (rows.length === 0) {
      return error(req, res, 'Categoría no encontrada', 404);
    }
    success(req, res, rows[0]);
  });
};

// Crear una nueva categoría
export const createCategoria = (req, res) => {
  const { categoria } = req.body;

  if (!categoria) {
    return error(req, res, 'El nombre es requerido', 400);
  }
  console.log(categoria)
  conexion.query('INSERT INTO tbl_categorias (categoria) VALUES (?)', [categoria], (err, result) => {
    if (err) {
      console.error('[DB ERROR]', err);
      return error(req, res, 'Error al crear la categoría');
    }
    success(req, res, { id: result.insertId, categoria }, 201);
  });
};

// Modificar categoría
export const updateCategoria = (req, res) => {
  const { id_categoria } = req.params;
  const { categoria } = req.body;

  if (!categoria) {
    return error(req, res, 'El nombre es requerido', 400);
  }

  conexion.query('UPDATE tbl_categorias SET categoria = ? WHERE id_categoria = ?', [categoria, id_categoria], (err, result) => {
    if (err) {
      console.error('[DB ERROR]', err);
      return error(req, res, 'Error al actualizar la categoría');
    }
    success(req, res, { mensaje: 'Categoría actualizada', id: id_categoria });
  });
};

// Eliminar categoría
export const deleteCategoria = (req, res) => {
  const { id_categoria } = req.params;

  conexion.query('DELETE FROM tbl_categorias WHERE id_categoria = ?', [id_categoria], (err, result) => {
    if (err) {
      console.error('[DB ERROR]', err);
      return error(req, res, 'Error al eliminar la categoría');
    }
    success(req, res, { mensaje: 'Categoría eliminada', id: id_categoria });
  });
};
