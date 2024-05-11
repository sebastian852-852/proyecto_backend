import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPedidosPrisma(filters: any) {
    const pedidos = await prisma.pedido.findMany(filters);
    return pedidos;
}

async function postPedidosPrisma(data: any) {

    const { librosId, compradorId, vendedorId, direccionEntrega, total } = data;

   const pedidoCreado = await prisma.pedido.create({
        data: {
            librosId: { connect: librosId.map((id: string) => ({ id })) },
            comprador: { connect: { id: compradorId } },
            vendedor: { connect: { id: vendedorId } },
            direccionEntrega: direccionEntrega,
            total: total
        }
    });

    return pedidoCreado;
}

async function putPedidosPrisma(id: any) {
    const pedidoActualizado = await prisma.pedido.update(id);
    return pedidoActualizado;
}

async function deletePedidosPrisma(id: any) {
    const pedidoEliminado = await prisma.pedido.delete(id);
    return pedidoEliminado;
}

async function unicoVendedor(librosId: any) {
    const libros = await prisma.libro.findMany({
        where: {
            id: {
                in: librosId
            }
        }
    });
    const vendedor = libros[0].usuarioId;

    return libros.every((libro) => libro.usuarioId === vendedor);
}

async function getVendedor(librosId: any) {
    const libros = await prisma.libro.findMany({
        where: {
            id: {
                in: librosId
            }
        }
    });
    return libros[0].usuarioId;
}

async function getTotal(librosId: any) {
    const libros = await prisma.libro.findMany({
        where: {
            id: {
                in: librosId
            }
        }
    });
    return libros.reduce((acc, libro) => acc + libro.precio, 0);
}

export { getPedidosPrisma, postPedidosPrisma, putPedidosPrisma, deletePedidosPrisma, unicoVendedor, getVendedor, getTotal };
