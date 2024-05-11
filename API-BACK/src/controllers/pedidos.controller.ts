import { deletePedidosPrisma, getPedidosPrisma, postPedidosPrisma, putPedidosPrisma, unicoVendedor, getVendedor, getTotal } from "../actions/pedidos.action";


async function getPedidos(query: any) {
    const { cliente, producto, cantidad, fecha } = query;
    const pedidos = await getPedidosPrisma(query);
    return pedidos;
}

async function createPedidos(datos: any) {
    const { librosId } = datos;

    if (!unicoVendedor(librosId)) {
        return new Error("Los libros deben ser del mismo vendedor");
    }

    datos.vendedorId = await getVendedor(librosId);
    datos.total = await getTotal(librosId);

    const pedidoCreado = await postPedidosPrisma(datos);
    return pedidoCreado;
}

async function updatePedidos(datos: any) {
    const { cliente, producto, cantidad, fecha } = datos;
    const pedidoActualizado = await putPedidosPrisma(datos);
    return pedidoActualizado;
}

async function deletePedidos(id: any) {
    const pedidoEliminado = await deletePedidosPrisma(id);
    return pedidoEliminado;
}

export { getPedidos, createPedidos, updatePedidos, deletePedidos };