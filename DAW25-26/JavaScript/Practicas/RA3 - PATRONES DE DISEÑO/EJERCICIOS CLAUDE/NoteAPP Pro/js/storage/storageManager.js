'use strict';

export class StorageManager {

    static addNote(note) {
        let arrayNotes = JSON.parse(localStorage.getItem('NoteList')) || [];
        arrayNotes.push(note);
        localStorage.setItem('NoteList', JSON.stringify(arrayNotes));
    }

    static getNotes() {
        return JSON.parse(localStorage.getItem('NoteList')) || [];
    }

    

    


}