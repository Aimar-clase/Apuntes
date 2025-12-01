const btnSubmit = document.getElementById("btnSubmit");
const usuarioInput = document.getElementById("usuario-input");
const passwdInput = document.getElementById("passwd-input");
btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    const usuarioForm = usuarioInput.value.trim();
    const passwForm = passwdInput.value.trim();
    if (validTextForm(usuarioForm, passwForm)) {
        if (userExist()) {
            checkCredenciales(usuarioForm, passwForm);
        } else {
            register(usuarioForm, passwForm);
        }
    };

});
function register(usuario, passwd) {
    const usuarioRegistrar = {
        usuario: usuario,
        password: passwd
    }

    localStorage.setItem("usuario", JSON.stringify(usuarioRegistrar));
    document.location.replace("juego.html");

}

function checkCredenciales(usuario, passwd) {

    const usuarioEnLocal = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioEnLocal.usuario === usuario && usuarioEnLocal.password === passwd) {
        document.location.replace("juego.html");
    } else {
        usuarioInput.setCustomValidity("El usuario o la contrasñea no coinciden");
        usuarioInput.reportValidity();
    }

};

function userExist() {
    const usuario = localStorage.getItem("usuario");

    if (usuario === null) {
        return false;
    }

    return true;
};

function validTextForm(usuario, passwd) {
    let errores = 0;
    if (usuario.length < 3) {
        usuarioInput.setCustomValidity("El usuario no puede tener menos de 3 caracteres");
        usuarioInput.reportValidity();
        errores++;
    }

    if (passwd.length <= 5) {
        passwdInput.setCustomValidity("La contraseña no peude ser menor que 6 caracteres");
        passwdInput.reportValidity();
        errores++;
    }

    if (errores != 0) {
        return false;
    } else {
        return true
    }

};