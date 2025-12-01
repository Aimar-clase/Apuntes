const formulario = document.getElementById("miFormulario");
const inputUsuario = document.getElementById("inputUsuario");
const inputPass = document.getElementById("inputPass");

function limpiarError(input) {
    input.setCustomValidity("");
}

function formularioEsValido() {

    limpiarError(inputUsuario);
    limpiarError(inputPass);


    if (inputUsuario.value.length < 4) {
        inputUsuario.setCustomValidity("El usuario debe tener al menos 4 letras.");
    }

    if (inputPass.value.length < 4) {
        inputPass.setCustomValidity("La contraseña debe tener al menos 4 letras.");
    }


    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return false;
    }
    return true;
}

function gestionarUsuario(usuario, password) {
    let usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado === null) {
        let nuevoUsuario = {
            nombre: usuario,
            contrasena: password
        };

        localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
        alert("Usuario nuevo registrado. ¡Entrando!");

        // window.location.href = "juego.html";

    } else {

        let datosReales = JSON.parse(usuarioGuardado);

        if (usuario === datosReales.nombre && password === datosReales.contrasena) {
            alert("Login correcto. ¡Entrando!");
            // window.location.href = "juego.html";

        } else {
            inputUsuario.setCustomValidity("Usuario o contraseña incorrectos");
            formulario.reportValidity();
        }
    }
}



inputUsuario.addEventListener("input", function () {
    limpiarError(inputUsuario);
});

inputPass.addEventListener("input", function () {
    limpiarError(inputPass);
});

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (formularioEsValido()) {
        gestionarUsuario(inputUsuario.value, inputPass.value);
    }
});