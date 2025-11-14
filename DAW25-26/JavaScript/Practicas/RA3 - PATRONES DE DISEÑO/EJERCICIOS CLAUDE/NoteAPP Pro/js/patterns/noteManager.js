'use strict';

import { Note } from "../models/note.js";
import { StorageManager } from "../storage/storageManager.js";
import { DomFacade } from "../ui/domFacade.js";
import { Validation } from "../validations/validations.js";

export class NoteManager {

    constructor() {
        if (NoteManager.instance) return NoteManager.instance;
        NoteManager.instance = this;
    }

    addNote() {
        const noteData = DomFacade.getNoteValues();
        const noteValid = Validation.isValid(noteData.title, noteData.content);
        if (noteValid === true) {
            const note = new Note(noteData);
            StorageManager.addNote(note);
        }
    }

    renderNotes() {
        const allNotes = StorageManager.getNotes();
        DomFacade.renderNoteList(allNotes);
    }
    // updateNote() {

    // }
    // removeNote() {

    // }

    // searchNotes() {

    // }
    // filter() {

    // }


}