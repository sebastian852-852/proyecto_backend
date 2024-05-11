import "dotenv/config"
import Express from "express";
import cors from "cors";





const PORT = process.env.PORT || 3000;
const app = Express();
app.use(cors());
app.use(Express.json());

import { router as routerLibros } from "./routes/libros.route"
app.use("/libros", routerLibros);

import { router as routerPedidos } from "./routes/pedidos.route"
app.use("/pedidos", routerPedidos);

import { router as reouterUsuarios } from "./routes/usuarios.route"
app.use("/usuarios", reouterUsuarios);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});