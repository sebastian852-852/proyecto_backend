import { getLibrosPrisma, postLibrosPrima, putLibrosPrisma,deleteLibrosPrisma } from '../actions/libros.action';

async function getLibros(query: any) {

    const { titulo, autor, editorial, fecha, genero } = query;

    const libros = getLibrosPrisma(query);

    return libros;
}


async function createLibros(datos: any) {
    
    const { titulo, autor, editorial, fecha, genero } = datos;

    const librocreado = await postLibrosPrima(datos);

    return librocreado;
}

function updateLibros(datos: any) {
    
    const { titulo, autor, editorial, fecha, genero } = datos;

    const libroactualizado = putLibrosPrisma(datos);

    return libroactualizado;
}


function deleteLibros(id: any) {
    const libroeliminado = deleteLibrosPrisma(id);
    return libroeliminado;
}

export { getLibros, createLibros, updateLibros, deleteLibros};