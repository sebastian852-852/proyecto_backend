import { registerUser, loginUser } from "../actions/usuarios.action";

async function register(data: any) {
    const newUser = await registerUser(data);
    return newUser;
}

async function login(data: any) {
    const logedUser = await loginUser(data);
    return logedUser;
}
export { register, login };