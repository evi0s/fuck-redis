import { User } from "../model/User";
import { Redis } from "../store";
import { hash } from "../hash";

async function login(_username: string, _password: string) {
    let result: any;
    try {
        result = await Redis.get(_username);

        if (result === hash(_password)) {
            return true
        }

    } catch (err) {
        throw err;
    }
    return false;
}

async function register(_username: string, _password: string) {
    let newUser = new User(_username, hash(_password));
    let result: any;
    try {
        result = await newUser.store();
    } catch (err) {
        throw err;
    }
    return result;
}


export {
    login,
    register
};
