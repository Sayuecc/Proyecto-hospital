//cargo los datos de la cookie
const doctoresCookie = JSON.parse(obtenerCookie("doctores"));
const pacientesCookie = JSON.parse(obtenerCookie("pacientes") || "[]");
const tablaDoctores = document.getElementById("tabla-doctores");
const cuerpoTabla = tablaDoctores.querySelector("tbody");



for (let i= 0; i < doctoresCookie.length; i++ ) {
    const doctor = doctoresCookie[i];
    //insertar fila para agregar mascotas
    const fila = cuerpoTabla.insertRow();
    //insertar celdas para agregar cada uno de los datos de las mascotas
    const nombreDoctor = fila.insertCell();
    const apellidoDoctor = fila.insertCell();
    const cedulaDoctor = fila.insertCell();
    const consultorio = fila.insertCell();
    const correoDoctor = fila.insertCell();
    const especialidad = fila.insertCell();
    //agregar la informaciona cada una de las celdas de la tabla
    nombreDoctor.textContent = doctor.nombreDoctor;
    apellidoDoctor.textContent = doctor.apellidoDoctor;
    cedulaDoctor.textContent = doctor.cedulaDoctor;
    consultorio.textContent = doctor.consultorio;
    correoDoctor.textContent = doctor.correoDoctor;
    especialidad.textContent = doctor.especialidad;
    //colocar los pacientes que atiende el dr
    //mediante filter encontramos todos los pacientes que tienen esa especialidad
    let pacientesEncontrados = pacientesCookie.filter(pacientes => doctor.especialidad === pacientes.especialidad);
    //se crea la celda
    const doctorPaciente = fila.insertCell();
    if (pacientesEncontrados.length > 0) {
        doctorPaciente.innerHTML = `<ul id="pacientes"></ul>`
        const Pacientes = doctorPaciente.querySelector("#pacientes")
        for (let j = 0; j < pacientesEncontrados.length; j++) {
            const pacienteEncontrado = pacientesEncontrados[j];
            Pacientes.innerHTML += `<li>${pacienteEncontrado.nombrePaciente}</li>`;
        }
    }else {
        doctorPaciente.textContent = "Sin pacientes";
    }
}

function obtenerCookie(nombre) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === nombre) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return "";
}