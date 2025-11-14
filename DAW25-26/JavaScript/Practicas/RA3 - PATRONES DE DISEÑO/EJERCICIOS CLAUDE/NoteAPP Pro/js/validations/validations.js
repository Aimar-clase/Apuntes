'use strict';

export class Validation {
    static isValid(title, content) {
        const titleValid = this.titleIsValid(title);
        const contentValid = this.contentIsValid(content);
        let errores = [];

        if (titleValid !== true) {
            errores.push(titleValid);
        }

        if (contentValid !== true) {
            errores.push(contentValid);
        }

        if (errores.length === 0) {
            return true;
        }

        return errores;
    }

    static titleIsValid(title) {
        const titleTrim = title.trim();
        if (titleTrim.length <= 3) {
            return "El titulo no puede tener menos de 3 caracteres";
        }
        return true;
    }

    static contentIsValid(content) {
        const contentTrim = content.trim();
        if (contentTrim.length <= 3) {
            return "El Contenido no puede tener menos de 3 caracteres";
        }
        return true;
    }
}