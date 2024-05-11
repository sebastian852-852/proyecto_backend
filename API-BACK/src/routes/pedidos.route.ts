

import { Request, Response, Router } from "express";
import { createPedidos, deletePedidos, getPedidos, updatePedidos } from "../controllers/pedidos.controller";
import { verifyToken } from "../actions/usuarios.action";

const router = Router();

interface CustomRequest extends Request {
    userid?: string; // Define la propiedad userid en la interfaz personalizada
}


router.get("/", async (req: Request, res: Response) => {
    try {
        const resultado = await getPedidos(req.body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pedidos" });
    }
});

router.post("/", verifyToken, async (req: CustomRequest, res: Response) => {
    try {
        req.body.compradorId = req.userid;
        const resultado = await createPedidos(req.body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/", async (req: Request, res: Response) => {
    try {
        await updatePedidos(req.body);
        res.status(200).json({ data: "Pedido actualizado" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el pedido" });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        await deletePedidos(req.params.id);
        res.status(200).json({ data: "Pedido eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el pedido" });
    }
});




export { router };