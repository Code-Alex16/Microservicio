import { Router } from "express";
import {
  getContactos,
  getContacto,
  createContacto,
  updateContacto,
  deleteContacto
} from "../controllers/Contactos.controller.js";
import { verifyToken } from "../middlewares/verificacionToken.js"; // Asegúrate de tener este middleware

const router = Router();

// ✅ Proteger todas las rutas con el token
router.get("/contactos", verifyToken, getContactos);
router.get("/contactos/:id_contacto", verifyToken, getContacto);
router.post("/contactos", verifyToken, createContacto);
router.put("/contactos/:id_contacto", verifyToken, updateContacto);
router.delete("/contactos/:id_contacto", verifyToken, deleteContacto);

export default router;
