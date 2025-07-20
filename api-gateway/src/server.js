import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { verifyToken } from "./middlewares/verificacionToken.js";
import cors from "cors"; // Asegúrate de que cors esté importado
import dotenv from "dotenv";

dotenv.config();
const app = express();

// --- Configuración de CORS ---
const corsOptions = {
    origin: 'http://localhost:4200', // Permite solo tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite todos los métodos HTTP que usarás
    allowedHeaders: ['Content-Type', 'Authorization'], // Muy importante: permite la cabecera Authorization
    credentials: true, // Si usas cookies o sesiones (aunque con JWT no es común)
    optionsSuccessStatus: 204 // Código de estado para respuestas OPTIONS exitosas
};

app.use(cors(corsOptions)); // Aplica CORS antes de cualquier otra ruta o middleware
// --- Fin Configuración de CORS ---

// Tus rutas proxy
app.use('/api/categorias', createProxyMiddleware({
    target: `http://localhost:${process.env.PORT_CATALOG}`,
    changeOrigin: true
}));

app.use('/api/contactos', verifyToken, createProxyMiddleware({
    target: `http://localhost:${process.env.PORT_CONTACT}`,
    changeOrigin: true
}));

app.use('/api/usuarios', createProxyMiddleware({
    target: `http://localhost:${process.env.PORT_USER}`,
    changeOrigin: true
}));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🛡️ API Gateway corriendo en http://localhost:${PORT}`);
});