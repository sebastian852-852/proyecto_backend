
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



async function getLibrosPrisma(filtrs: any) {

    const libros = await prisma.libro.findMany(filtrs);
    return libros;

}

async function postLibrosPrima(data: any) {
    const { titulo, autor, casaEditorial, fechaPublicacion, vendedor, genero, precio } = data;

    const librocreado = await prisma.libro.create({
        data: {
            titulo: titulo,
            genero: genero,
            fechaPublicacion: new Date(fechaPublicacion),
            casaEditorial: casaEditorial,
            autor: autor,
            vendedor: {
                connect: { id: vendedor } // Conecta el libro al vendedor utilizando su ID
            },
            precio: precio
        }
    }
    );

    return librocreado;

}

async function putLibrosPrisma(id: any) {

    const libroactualizado = await prisma.libro.update(id);

    return libroactualizado;

}

async function deleteLibrosPrisma(id: any) {

    const libroeliminado = await prisma.libro.delete(id);

    return libroeliminado;


}


export { getLibrosPrisma, postLibrosPrima, putLibrosPrisma, deleteLibrosPrisma };