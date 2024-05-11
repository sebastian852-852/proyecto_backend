import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SECRET_KEY } from "../../config";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";


const prisma = new PrismaClient();

async function encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function registerUser(data: any) {
    const { nombre, correo, password } = data;

    const userCreated = await new PrismaClient().usuario.create({
        data: {
            nombre,
            correo,
            password: await encryptPassword(password)
        }
    }
    );
    return userCreated;
}

async function loginUser(data: any) {
    const { correo, password } = data;

    const userFound = await new PrismaClient().usuario.findUnique({
        where: {
            correo
        }
    }
    );

    if (!userFound) {
        return new Error("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
        return new Error("Contraseña incorrecta");
    }

    const token = jwt.sign({ id: userFound.id }, SECRET_KEY, {
        expiresIn: "1d"
    });

    return { token };
}

interface CustomRequest extends Request {
    userid?: string; // Define la propiedad userid en la interfaz personalizada
}

async function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const token = req.headers["x-access-token"] as string;
        if (!token) {
            return res.status(403).json({ message: "No se proporcionó un token" });
        }
        const decoded: any = await jwt.verify(token, SECRET_KEY);
        req.userid = decoded.id;

        const user = await prisma.usuario.findUnique({
            where: {
                id: String(req.userid)
            },
            select: {
                id: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        next();
    } catch (error: any) {
        return res.status(401).json({ message: "No autorizado", error: error.message });

    }
}

export { registerUser, loginUser, verifyToken};