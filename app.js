import colors from "colors";
import {
  inquirerBorrarTarea,
  inquirerConfirm,
  inquirerInput,
  inquirerMenu,
  inquirerMostrarListadoChecklist,
  inquirerPause,
} from "./helpers/inquirer.js";
import Tareas from "./models/Tareas.js";
import { guardarDB, leerDB } from "./helpers/metodosDB.js";

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareas(tareasDB);
  }
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const descripcion = await inquirerInput("Descripción:");
        tareas.crearTarea(descripcion);
        break;
      case "2":
        tareas.listarTareas();
        break;
      case "3":
        tareas.listarTareasCompletadas();
        break;
      case "4":
        tareas.listarTareasPendientes();
        break;
      case "5":
        const tareasIds = await inquirerMostrarListadoChecklist(
          tareas.listadoTareas
        );
        tareas.toggleCompletarTareas(tareasIds);
        break;
      case "6":
        const tareaId = await inquirerBorrarTarea(tareas.listadoTareas);
        if (tareaId !== "0") return;
        const confirm = await inquirerConfirm("¿Estás seguro?");
        if (confirm) {
          tareas.borrarTarea(tareaId);
          console.log("\nTarea eliminada".green);
        }
        break;

      default:
        break;
    }

    guardarDB(JSON.stringify(tareas.listadoTareas));

    if (opt !== "0") await inquirerPause();
  } while (opt !== "0");
};

main();
