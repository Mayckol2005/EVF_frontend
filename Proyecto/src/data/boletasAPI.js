const BOLETAS_STORAGE_KEY = 'boletas_db';
const initialBoletas = []; 

/**
 * Obtiene todas las boletas guardadas y las ordena por fecha (más nuevas primero).
 * @returns {Promise<Array>} Una promesa que resuelve a un array de boletas ordenado.
 */
export const getAllBoletas = () => {
  return new Promise((resolve) => {
    // Simulamos un pequeño retraso (opcional, pero consistente con otras APIs)
    setTimeout(() => {
      const boletasJSON = localStorage.getItem(BOLETAS_STORAGE_KEY);
      let boletas = [];
      if (boletasJSON) {
        try {
          boletas = JSON.parse(boletasJSON);
        } catch (error) {
          console.error("Error al parsear boletas de localStorage:", error);
          boletas = [...initialBoletas]; // Usar iniciales si hay error
          localStorage.setItem(BOLETAS_STORAGE_KEY, JSON.stringify(boletas));
        }
      } else {
        boletas = [...initialBoletas]; // Usar y guardar iniciales si no existen
        localStorage.setItem(BOLETAS_STORAGE_KEY, JSON.stringify(boletas));
      }

      // Ordena por fecha DECRECIENTE (más nuevas primero)
      const sortedBoletas = [...boletas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      // --------------------------------------------------

      resolve(sortedBoletas); // Devolvemos la lista ORDENADA
    }, 500);
  });
};

/**
 * Guarda una nueva boleta en localStorage.
 * @param {object} boletaData Los datos de la boleta a guardar.
 * @returns {Promise<object>} Una promesa que resuelve con la boleta guardada.
 */
export const createBoleta = (boletaData) => {
  // Usamos async/await para leer antes de escribir de forma segura
  return new Promise(async (resolve, reject) => {
    try {
      // Leemos directamente de localStorage para obtener la lista NO ordenada actual
      const currentBoletasJSON = localStorage.getItem(BOLETAS_STORAGE_KEY);
      let currentBoletas = [];
      if (currentBoletasJSON) {
          try {
              currentBoletas = JSON.parse(currentBoletasJSON);
          } catch (error) {
              console.error("Error al parsear boletas existentes en createBoleta:", error);   
              currentBoletas = [...initialBoletas];
          }
      } else {
          currentBoletas = [...initialBoletas]; // Empezar con iniciales si no hay nada
      }

      // Asignamos ID si es necesario (si no viene en boletaData.numero)
      const newBoleta = { ...boletaData };

      currentBoletas.push(newBoleta); // Añadimos la nueva boleta al final

      // Guardamos la lista completa y actualizada
      localStorage.setItem(BOLETAS_STORAGE_KEY, JSON.stringify(currentBoletas));

      resolve(newBoleta); // Devolvemos la boleta que acabamos de crear
    } catch (error) {
        console.error("Error en createBoleta:", error);
        reject(error);
    }
  });
};
