import { Redis } from "../store";

class Note {
    private title  : string;
    private content: string;

    constructor(_title: string, _content: string) {
        this.title   = _title;
        this.content = _content;
    }

    public getTitle(): string {
        return this.title;
    }

    public getContent(): string {
        return this.content;
    }

    public async store() {
        try {
            await Redis.set(this.title, this.content);
        } catch (err) {
            throw err;
        }
    }
}

export { Note };
