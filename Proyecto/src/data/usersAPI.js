// --- 1. CLAVE DE LOCALSTORAGE ---
const USERS_STORAGE_KEY = 'users_db';

// --- 2. DATOS INICIALES (SI LOCALSTORAGE ESTÁ VACÍO) ---
// Estos solo se usarán la primera vez o si borramos localStorage
const initialUsers = [
  {
    id: 1,
    rut: '12345678-9',
    nombre: 'Admin',
    apellidos: 'Principal',
    correo: 'admin@duoc.cl',
    password: 'admin',
    tipo: 'administrador',
    fechaNacimiento: '1990-01-01',
    region: 'Los Lagos',
    comuna: 'Puerto Montt',
    direccion: 'Calle Falsa 123'
  },
  {
    id: 2,
    rut: '11111111-1',
    nombre: 'Cliente',
    apellidos: 'Prueba',
    correo: 'cliente@gmail.com',
    password: 'cliente',
    tipo: 'cliente',
    fechaNacimiento: '1995-05-15',
    region: 'Metropolitana',
    comuna: 'Santiago',
    direccion: 'Avenida Siempre Viva 742'
  }
];

// --- 3. FUNCIONES CRUD CON LOCALSTORAGE ---

export const getAllUsers = () => {
  return new Promise((resolve) => {
    const usersJSON = localStorage.getItem(USERS_STORAGE_KEY);
    let users = [];
    if (usersJSON) {
      try {
        users = JSON.parse(usersJSON);
      } catch (error) {
        console.error("Error al parsear usuarios de localStorage:", error);
        // Si hay error, usamos los iniciales como fallback
        users = [...initialUsers];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users)); // Guardar los iniciales
      }
    } else {
      // Si no hay nada, guardar y usar los iniciales
      users = [...initialUsers];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
    resolve(users); // Devolvemos los usuarios leídos o los iniciales
  });
};

//Crear nuevo usuario
export const createUser = (userData) => {
  // Usamos async/await dentro de la promesa para leer antes de escribir
  return new Promise(async (resolve, reject) => { 
    try {
      const users = await getAllUsers(); // Leer usuarios actuales

      // Validar si el correo ya existe
      const existingUser = users.find(u => u.correo === userData.correo);
      if (existingUser) {
        // Rechazar la promesa si el correo existe
        return reject(new Error('El correo electrónico ya está registrado.')); 
      }

      // Calcular nuevo ID (simple, basado en el máximo actual)
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const newUser = {
        ...userData,
        id: newId,
        // Asegurarse de que el tipo sea 'cliente' si no se especifica
        tipo: userData.tipo || 'cliente' 
      };

      // Añadir el nuevo usuario a la lista
      users.push(newUser);

      // Guardar TODA la lista actualizada en localStorage
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      
      resolve(newUser); // Devolver el usuario recién creado

    } catch (error) {
        console.error("Error en createUser:", error);
        reject(error); // Rechazar si hubo algún otro error
    }
  });
};

//Actualizar usuario
export const updateUser = (id, updates) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await getAllUsers(); // Leer usuarios actuales
      const userId = parseInt(id); // Asegurar que el ID sea número
      const index = users.findIndex(u => u.id === userId);

      if (index !== -1) {
        // Validar si el NUEVO correo ya existe en OTRO usuario
        if (updates.correo && updates.correo !== users[index].correo) {
           const existingEmailUser = users.find(u => u.correo === updates.correo && u.id !== userId);
           if (existingEmailUser) {
              return reject(new Error('El nuevo correo electrónico ya está en uso por otro usuario.'));
           }
        }

        // Crear el objeto actualizado (sin modificar la contraseña si no se provee)
        const updatedUser = { ...users[index], ...updates };
        
        // Si 'updates' no incluía 'password', mantenemos la original
        if (!updates.password) {
            updatedUser.password = users[index].password; 
        } else if (updates.password === "") { // Si se envió vacía, mantener original
            updatedUser.password = users[index].password;
        }

        // Reemplazar el usuario en la lista
        users[index] = updatedUser;

        // Guardar la lista actualizada
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        
        // Devolver el usuario actualizado (sin la contraseña por seguridad?)
        // const { password, ...userToReturn } = updatedUser; 
        // resolve(userToReturn); 
        resolve(updatedUser); // O devolverlo completo si lo necesitamos

      } else {
        reject(new Error('No se pudo actualizar: Usuario no encontrado'));
      }
    } catch (error) {
        console.error("Error en updateUser:", error);
        reject(error);
    }
  });
};

//Eliminar usuario
export const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await getAllUsers(); // Leer usuarios actuales
      const userId = parseInt(id); // Asegurar ID numérico
      const initialLength = users.length;

      // Filtrar para crear una NUEVA lista sin el usuario
      users = users.filter(u => u.id !== userId);

      // Verificar si realmente se eliminó algo
      if (users.length < initialLength) {
        // Guardar la lista filtrada
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        resolve({ message: 'Usuario eliminado con éxito.' }); // Éxito
      } else {
        reject(new Error('No se pudo eliminar: Usuario no encontrado'));
      }
    } catch (error) {
        console.error("Error en deleteUser:", error);
        reject(error);
    }
  });
};

//Obtener usuario por ID
export const getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
        const users = await getAllUsers();
        const userId = parseInt(id);
        const user = users.find(u => u.id === userId);
        if (user) {
            resolve(user);
        } else {
            reject(new Error('Usuario no encontrado.'));
        }
    } catch (error) {
        console.error("Error en getUserById:", error);
        reject(error);
    }
  });
};