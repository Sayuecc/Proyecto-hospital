//creo una variable que obtenga el formulario
const formularioDoctores = document.getElementById("registro-doctores-form")
//hago que la variable escuche cuando se de clilc en enviar con los datos
formularioDoctores.addEventListener("submit", (event) => {
    //evito que los datos se envien sin llenarse
    event.preventDefault();
    //creo un objeto que almacene los datos quue llenen
    const datosDoctor = {
        nombreDoctor: document.getElementById("nombre").value,
        apellidoDoctor: document.getElementById("apellido").value,
        cedulaDoctor: document.getElementById("cedula").value,
        consultorio: document.getElementById("consultorio").value,
        correoDoctor: document.getElementById("email").value,
        especialidad: document.getElementById("especialidad").value,
    };
    const doctoresCookie = obtenerCookie('doctores') ? JSON.parse(obtenerCookie('doctores')) : [];
    const existeDoctor = doctoresCookie.some(doctores => doctores.especialidad === datosDoctor.especialidad);
    if (existeDoctor) {
        alert("Ya existe un doctor para esta especialidad");
    } else {
        guardarCookies(datosDoctor);
    }
    const confirmacion = confirm("¿Desea ver los datos o seguir añadiendo doctores?");
    if (confirmacion == true) {
        window.location.href = "doctores.html";
    } else {
        formularioDoctores.reset()
    }
});
//creo la función guardar cookies
function guardarCookies(paciente) {
    //se crea una variable datos que almacene las cookies de pacientes
    let datos = obtenerCookie("doctores");
    if (datos === "") {
        datos = "[]";
    }
    //convierto las cookis en un objeto para poder usarlas
    const pacientesObjetos = JSON.parse(datos);
    //cojo este objeto y le añado nuevas cookies
    pacientesObjetos.push(paciente);
    const jsonDatos = JSON.stringify(pacientesObjetos)
    cambiarCookie("doctores", jsonDatos)
}

function obtenerCookie(nombre) {
    const cookies = document.cookie.split("; ")
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if(cookie[0] === nombre) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return "";
}

function cambiarCookie(nombre, valor) {
    document.cookie = `${nombre}=${encodeURIComponent(valor)}`;
}