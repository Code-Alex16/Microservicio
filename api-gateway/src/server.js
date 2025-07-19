import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware"
import { verifyToken } from "./middlewares/verificacionToken.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use('/api/categorias', verifyToken, createProxyMiddleware({
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