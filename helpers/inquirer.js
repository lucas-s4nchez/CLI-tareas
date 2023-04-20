import inquirer from "inquirer";
import colors from "colors";
import { menuQuestions, pauseQuestions } from "./options.js";

export const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".green);
  console.log("   Seleccione una opción   ".white);
  console.log("===========================\n".green);

  const { opcion } = await inquirer.prompt(menuQuestions);
  return opcion;
};

export const inquirerPause = async () => {
  console.log("\n");
  await inquirer.prompt(pauseQuestions);
};

export const inquirerInput = async (message) => {
  const inputQuestion = [
    {
      type: "input",
      name: "desc",
      message: message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(inputQuestion);
  return desc;
};

export const inquirerBorrarTarea = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: `${`${index + 1}.`.green} ${tarea.descripcion}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + "Cancelar",
  });

  const deleteQuestions = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(deleteQuestions);

  return id;
};

export const inquirerConfirm = async (message) => {
  const confirmQuestion = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(confirmQuestion);

  return ok;
};

export const inquirerMostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: `${`${index + 1}.`.green} ${tarea.descripcion}`,
      checked: tarea.completadaEn ? true : false,
    };
  });

  const checklistQuestions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(checklistQuestions);

  return ids;
};
