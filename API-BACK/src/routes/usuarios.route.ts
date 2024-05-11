
import { Request, Response, Router } from "express";
import { register, login } from "../controllers/usuarios.controller";

const router = Router();


router.get("/usuarios", (req: Request, res: Response) => {

    res.send({ data: "Aqui van los usuarios" });

});

router.post("/register", async (req: Request, res: Response) => {
    try {
        const newUser = await register(req.body);
        res.status(201).json({ "message": "Usuario creado correctamente", "data": newUser });
    } catch (error: any) {
        res.status(400).json({ "message": "Error al crear el usuario", "error": error.message });
    }
})

router.post("/login", async (req: Request, res: Response) => {
    try {
        const logedUser = await login(req.body);
        res.status(201).json({ "message": "Usuario creado correctamente", "data": logedUser });
    } catch (error: any) {
        res.status(400).json({ "message": "Error al crear el usuario", "error": error.message });
    }
})

export { router };