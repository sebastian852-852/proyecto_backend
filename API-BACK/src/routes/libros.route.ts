

import { Request, Response, Router } from "express";
import { createLibros, deleteLibros, getLibros, updateLibros } from "../controllers/libros.controller";
import { verifyToken } from "../actions/usuarios.action";
const router = Router();


interface CustomRequest extends Request {
  userid?: string; // Define la propiedad userid en la interfaz personalizada
}



router.get("/", async (req: Request, res: Response) => {

  try {
    const resultado = await getLibros(req.body);
    res.status(200).json(resultado);
  } catch (error) {
    throw new Error("Error al obtener los libros");

  }

});

router.post("/", verifyToken, async (req: CustomRequest, res: Response) => {
  try {
    req.body.vendedor = req.userid;
    const resultado = await createLibros(req.body);
    res.status(200).json(resultado);

  } catch (error: any) {
    throw new Error(error);
  }
});

router.put("/", (req: Request, res: Response) => {
  try {
    updateLibros(req.body);
    res.status(200).json({ data: "Libro actualizado" });

  } catch (error) {

    throw new Error("Error al actualizar el libro");
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  try {
    deleteLibros(req.body);
    res.status(200).json({ data: "Libro eliminado" });

  } catch (error) {

    throw new Error("Error al eliminar el libro");
  }
});









export { router };