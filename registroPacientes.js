const formularioPacientes = document.getElementById("registro-pacientes-form")
formularioPacientes.addEventListener('submit', (event) =>{
    event.preventDefault();
    const datosPaciente = {
        nombrePaciente: document.getElementById('nombre').value,
        apellidoPaciente: document.getElementById('apellido').value,
        cedulaPaciente: document.getElementById('cedula').value,
        edadPaciente: document.getElementById('edad').value,
        telefonoPaciente: document.getElementById('telefono').value,
        especialidad: document.getElementById('especialidad').value,
    };
    guardarCookies(datosPaciente)
    
    const confirmacion = confirm("¿Desea ver los datos o seguir añadiendo pacientes?");
    if(confirmacion == true){
        window.location.href = "pacientes.html";
    }else{
        formularioPacientes.reset()
    }
});


function guardarCookies(paciente) {
    //se crea una variable datos que almacene las cookies de pacientes
    let datos = obtenerCookie("pacientes");
    if (datos === "") {
        datos = "[]";
    }
    //convierto las cookis en un objeto para poder usarlas
    const pacientesObjetos = JSON.parse(datos);
    //cojo ese objeto y le añado las nuevas cookies
    pacientesObjetos.push(paciente);
    const jsonDatos = JSON.stringify(pacientesObjetos);
    cambiarCookie("pacientes", jsonDatos);

}


function obtenerCookie(nombre) {
    const cookies = document.cookie.split("; ")
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === nombre) {
        return decodeURIComponent(cookie[1]);
        }
    }
    return "";
}

function cambiarCookie(nombre, valor) {
    document.cookie = `${nombre}=${encodeURIComponent(valor)}`;
}