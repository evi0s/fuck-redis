import { passwordsalt } from "./config";
import crypto = require('crypto');

let hash = function (password: string): string {
    return crypto.createHmac('sha256', password)
        .update(passwordsalt)
        .digest('hex');
};

let judge = function (str: string, hashed_str: string): boolean {
    return hash(str) == hashed_str;
};

export {
    hash,
    judge
}