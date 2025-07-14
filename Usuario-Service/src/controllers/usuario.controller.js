import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { conexion } from '../db.js';

dotenv.config();

export const register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ mensaje: 'Campos requeridos' });

  const hash = bcrypt.hashSync(password, 10);

  conexion.query(
    'INSERT INTO tbl_usuario (username, passkey) VALUES (?, ?)',
    [username, hash],
    (err, result) => {
      if (err) return res.status(500).json({ mensaje: 'Error al registrar usuario' });
      res.status(201).json({ mensaje: 'Usuario registrado' });
    }
  );
};

export const login = (req, res) => {
  const { username, password } = req.body;

  conexion.query('SELECT * FROM tbl_usuario WHERE username = ?', [username], (err, rows) => {
    if (err) return res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    if (rows.length === 0) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    const usuario = rows[0];
    const match = bcrypt.compareSync(password, usuario.passkey);

    if (!match) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, username: usuario.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  });
};
