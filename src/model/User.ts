import { Redis } from "../store";

class User {
    private username: string;
    private password: string;

    constructor(_username: string, _password: string) {
        this.username = _username;
        this.password = _password;
    }

    public async store() {
        let result: any;
        try {
            result = await Redis.set(this.username, this.password, 'NX');
        } catch (err) {
            throw err;
        }
        return result;
    }
}

export { User };
