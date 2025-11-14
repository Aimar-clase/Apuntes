'use strict';

export class Note {
    constructor({ title, content, category }) {
        this.id = Date.now();
        this.title = title;
        this.content = content;
        this.category = category;
        this.createdAt = new Date().toLocaleDateString();
    }
}

