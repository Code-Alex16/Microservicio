import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conMysql } from './db.js';
import usuariosRoutes from './routes/usuario.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(usuariosRoutes);

// Inicializa conexión a la base de datos
conMysql();

app.listen(process.env.PORT, () => {
    console.log(`🚀 usuario-service activo en http://localhost:${process.env.PORT}`)
})
