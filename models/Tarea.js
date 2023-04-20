import { v4 as uuidv4 } from "uuid";

class Tarea {
  id = "";
  descripcion = "";
  completadaEn = null;

  constructor(descripcion) {
    this.id = uuidv4();
    this.descripcion = descripcion;
    this.completadaEn = null;
  }
}

export default Tarea;
