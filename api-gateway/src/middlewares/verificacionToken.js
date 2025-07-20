import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; // Asegúrate de importar dotenv
dotenv.config(); // Asegúrate de llamar a dotenv.config()

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Obtener el header completo

  // Extraer solo el token (sin "Bearer ")
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Si no hay token, 401 Unauthorized
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar el token SIN el prefijo "Bearer "
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // adjunta el payload del usuario a la request
    next();
  } catch (err) {
    // Si el token es inválido o expirado, 403 Forbidden
    console.error('Error al verificar token en API Gateway:', err); // ¡Muy útil para depurar!
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}