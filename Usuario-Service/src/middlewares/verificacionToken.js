import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ mensaje: 'Token no proporcionado' });

  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ mensaje: 'Token inválido' });

    req.user = decoded;
    next();
  });
}
