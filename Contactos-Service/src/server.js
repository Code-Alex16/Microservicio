import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { conMysql } from './db.js';
import ContactosRoutes from './routes/Contactos.routes.js';

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(ContactosRoutes);

// Inicializa conexión a la base de datos
conMysql();

app.listen(process.env.PORT, () => {
  console.log(`🚀 Contactos-service corriendo en http://localhost:${process.env.PORT}`);
});
