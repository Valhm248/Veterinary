const namePetInput = document.getElementById("name_pet");
const namePersonInput = document.getElementById("name_person");
const phonePersonInput = document.getElementById("phone_person");
const dateCiteInput = document.getElementById("date_cite");
const timeCiteInput = document.getElementById("time_cite");
const descriptionInput = document.getElementById("description");
const contenedorCard = document.getElementById("container_card");

let formulario = document.querySelector("form");
let actualizando = false;
let nombreEliminar;
let lista_mascotas = [];

document.addEventListener("DOMContentLoaded", () => {

  let mascotaGuardadaLS = localStorage.getItem("mascotaGuardada")

  if(mascotaGuardadaLS){
    lista_mascotas = JSON.parse(mascotaGuardadaLS)
  
    llamarInfo();
  }
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const mascotas = {
    nombre: namePetInput.value,
    propietario: namePersonInput.value,
    telefono: phonePersonInput.value,
    fecha: dateCiteInput.value,
    hora: timeCiteInput.value,
    sintomas: descriptionInput.value,
  };

  const vacio = Object.keys(mascotas).some((key) => mascotas[key] == "");

  if (vacio) return;
  if (actualizando) {
    lista_mascotas = lista_mascotas.filter(
      (mascota) => mascota.nombre != nombreEliminar
    );
  }

  lista_mascotas.push(mascotas);

  llamarInfo();
  actualizando = false;
  namePetInput.disabled = false;
  formulario.reset();
  formulario.classList.remove("was-validated");
});

function llamarInfo() {
  contenedorCard.innerHTML = "";

  lista_mascotas.forEach((mascotas) => {
    contenedorCard.innerHTML += `<div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Confirmación cita</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" id="nombreMascota">Nombre mascota: ${mascotas.nombre}</li>
          <li class="list-group-item" id="nombrePropietario">Nombre propietario: ${mascotas.propietario}</li>
          <li class="list-group-item" id="contacto">Contacto: ${mascotas.telefono}</li>
          <li class="list-group-item" id="fecha">Fecha: ${mascotas.fecha}</li>
          <li class="list-group-item" id="hora">Hora: ${mascotas.hora}</li>
          <li class="list-group-item" id="sintomas">Descripción: ${mascotas.sintomas}</li>
        </ul>
        <div class="card-body">
        <button type="submit" class="btn btn-success w-40 btn-editar" nombre-mascota="${mascotas.nombre}">Editar</button>
        <button type="submit" class="btn btn-success w-40 btn-eliminar" nombre-mascota="${mascotas.nombre}" >
          Eliminar
        </button>
      </div>
    </div>
    <hr>
    `;
  });

  cargarEventos();
  cargarEditar();

  localStorage.setItem("mascotaGuardada", JSON.stringify(lista_mascotas))
  
}
function cargarEditar() {
  const botones = document.querySelectorAll(".btn-editar");
  botones.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      const nombreEditar = boton.getAttribute("nombre-mascota");
      const mascotaEditar = lista_mascotas.find(
        (mascota) => mascota.nombre == nombreEditar
      );

      // console.log(namePetInput.disabled);
      // namePetInput.disabled = true;
      namePetInput.value = mascotaEditar.nombre;
      namePersonInput.value = mascotaEditar.propietario;
      phonePersonInput.value = mascotaEditar.telefono;
      dateCiteInput.value = mascotaEditar.fecha;
      timeCiteInput.value = mascotaEditar.hora;
      descriptionInput.value = mascotaEditar.sintomas;
      console.log(mascotaEditar);
      actualizando = true;

      nombreEliminar = nombreEditar;
    });
  });
}

function cargarEventos(params) {
  const botones = document.querySelectorAll(".btn-eliminar");
  botones.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      const nombreEliminar = boton.getAttribute("nombre-mascota");
      lista_mascotas = lista_mascotas.filter(
        (mascota) => mascota.nombre != nombreEliminar
      );

      llamarInfo();
    });
  });
}
