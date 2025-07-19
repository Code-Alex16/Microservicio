import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // adjunta el payload del usuario a la request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
}
