'use strict';

export class DomFacade {

    static renderNoteList(allNotes) {
        const divListaNotas = document.getElementById("div-note-list");

        allNotes.forEach(note => {
            const noteArticle = document.createElement("article");
            const labelTitle = document.createElement("h2");
            const labelContent = document.createElement("p");
            const labelCategory = document.createElement("p");
            const labelCreatedAt = document.createElement("p");

            labelTitle.textContent = note.title;
            labelContent.textContent = note.content;
            labelCategory.textContent = note.category;
            labelCreatedAt.textContent = note.createdAt;

            noteArticle.appendChild(labelTitle);
            noteArticle.appendChild(labelContent);
            noteArticle.appendChild(labelCategory);
            noteArticle.appendChild(labelCreatedAt);

            divListaNotas.appendChild(noteArticle);
        });


    }

    static getNoteValues() {
        const title = document.getElementById("title-note").value;
        const content = document.getElementById("content-note").value;
        const category = document.getElementById("category-select").value;

        return { title, content, category };
    }


}