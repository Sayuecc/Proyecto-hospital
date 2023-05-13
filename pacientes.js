//cargar los drs y pacientes que están guardados, como estan en forma JSON se pasan a objetos para poder trabajarlo
const pacientesCookie = JSON.parse(obtenerCookie("pacientes"));
const doctoresCookie = JSON.parse(obtenerCookie("doctores") || "[]");
//buscar la tabla pacientes en HTML para agregar nuevos pacientes
const tablaPacientes = document.getElementById("tabla-pacientes");
const cuerpoTabla = tablaPacientes.querySelector("tbody");


for (let i = 0; i < pacientesCookie.length; i++ ) {
    const paciente = pacientesCookie[i];

    const fila = cuerpoTabla.insertRow();
    const nombrePaciente = fila.insertCell();
    const apellidoPaciente = fila.insertCell();
    const cedulaPaciente = fila.insertCell();
    const edadPaciente = fila.insertCell();
    const telefonoPaciente = fila.insertCell();
    const especialidad = fila.insertCell();

    nombrePaciente.textContent = paciente.nombrePaciente;
    apellidoPaciente.textContent = paciente.apellidoPaciente;
    cedulaPaciente.textContent = paciente.cedulaPaciente;
    edadPaciente.textContent = paciente.edadPaciente;
    telefonoPaciente.textContent = paciente.telefonoPaciente;
    especialidad.textContent = paciente.especialidad;
    //se asigna el dr que va a tratar al paciente
    //con find encontramos el dr que tenga tal especialidad

    const doctorEspecialidad = doctoresCookie.find(doctores => doctores.especialidad === paciente.especialidad);
    const DoctorPaciente = fila.insertCell();
    //si hay drs colocar el nombre del dr, de lo contrario que diga "por asignar"
    DoctorPaciente.textContent = doctorEspecialidad ? doctorEspecialidad.nombreDoctor : "Por asignar";
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