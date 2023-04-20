import colors from "colors";
import Tarea from "./Tarea.js";

class Tareas {
  _listado = {};

  //Retorna un array de las tareas desde un objeto
  get listadoTareas() {
    const listaDeTareas = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listaDeTareas.push(tarea);
    });
    return listaDeTareas;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareas(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(descripcion = "") {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  listarTareas() {
    this.listadoTareas.forEach((tarea, index) => {
      console.log(
        `${tarea.completadaEn ? `${index + 1}.`.green : `${index + 1}.`.red} ${
          tarea.descripcion
        } :: ${tarea.completadaEn ? tarea.completadaEn.green : "Pendiente".red}`
      );
    });
  }

  listarTareasPendientes() {
    const listadoTareasPendientes = this.listadoTareas.filter(
      (tarea) => tarea.completadaEn === null
    );
    listadoTareasPendientes.forEach((tarea, index) => {
      console.log(
        `${`${index + 1}.`.red} ${tarea.descripcion} :: ${"Pendiente".red}`
      );
    });
  }

  listarTareasCompletadas() {
    const listadoTareasCompletadas = this.listadoTareas.filter(
      (tarea) => tarea.completadaEn !== null
    );
    listadoTareasCompletadas.forEach((tarea, index) => {
      console.log(
        `${`${index + 1}.`.green} ${tarea.descripcion} :: ${
          tarea.completadaEn.green
        }`
      );
    });
  }

  borrarTarea(id = "") {
    if (id) {
      delete this._listado[id];
    }
  }

  toggleCompletarTareas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadaEn) {
        tarea.completadaEn = new Date().toISOString();
      }
    });

    this.listadoTareas.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadaEn = null;
      }
    });
  }
}

export default Tareas;
