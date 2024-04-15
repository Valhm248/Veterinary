class AdministrarCitas {
  constructor() {
    this.citas = [];
    this.editando = false;
  }

  agregarCita(cita) {
    if (this.editando) {
      //en caso de editar
      return;
    }

    //en caso de estar agregando
    this.citas.push({...cita, id: Date.now()});
  }
}

class UI {
  imprimirCitas(citas, contenedor) {
    contenedor.innerHTML = "";

    citas.forEach((cita) => {
      contenedor.innerHTML += `
            <div class="card" style="width: 18rem">
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
    <hr>`;
    });
  }
}


const administrar_citas = new AdministrarCitas();
const administrarUI = new UI();



//SELECTORES

const mascota = document.getElementById("namepet");
const propietario = document.getElementById("name_person");
const telefono = document.getElementById("phone_person");
const fecha = document.getElementById("date_cite");
const hora = document.getElementById("time_cite");
const sintomas = document.getElementById("description");


//eventos

formulario.addEventListener("submit", (event) => {
    event.preventDefault()

    const nuevaCita = {
        mascota: mascota.value,
        propietario: propietario.value,
        telefono: telefono.value,
        fecha: fecha.value,
        hora: hora.value,
        sintomas: sintomas.value,
    }

    AdministrarCitas.agregarCita(nuevaCita)

    formulario.reset()

    console.log(administrar_citas.citas);
})