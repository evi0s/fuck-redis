import { Note } from "../model/Note";
import { Redis } from "../store";

async function searchNote(_title: string) {
    let result: any;
    try {
        result = await Redis.get(_title);
    } catch (err) {
        throw err;
    }
    return result;
}

async function submitNote(_title: string, _content: string) {
    let newNote = new Note(_title, _content);
    let result: any;
    try {
        result = await newNote.store();
    } catch (err) {
        throw err;
    }
    return result;
}


export {
    searchNote,
    submitNote
};
