import { Router } from "express";
import {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from "../controllers/categorias.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Categorías Service funcionando correctamente");
});

router.get("/categorias", getCategorias);
router.get("/categoria/:id_categoria", getCategoria);
router.post("/categoria/nueva", createCategoria);
router.put("/categorias/:id_categoria", updateCategoria);
router.delete("/categorias/:id_categoria", deleteCategoria);

export default router;
