
// --- 1. CLAVE PARA GUARDAR EN LOCALSTORAGE ---
const PRODUCTS_STORAGE_KEY = 'products_db';

// --- 2. DATOS INICIALES (TUS PRODUCTOS) ---
// Estos se usarán solo si localStorage está vacío la primera vez.
const initialProducts = [
  {
    id: 1,
    name: '1 Million',
    brand: 'Paco Rabanne',
    price: 89000,
    normalPrice: 99000,
    image: '/assets/img/1 Million Rabanne.webp',
    genero: 'Masculino',
    categoriaId: 'perfumes-varon',
    tipo: 'Eau de Toilette',
    stock: 20,
    description: 'Una fragancia icónica y extravagante, que representa el lujo y el poder. Notas de cuero especiado, mandarina y canela.'
  },
  {
    id: 2,
    name: 'Black Orchid',
    brand: 'Tom Ford',
    price: 115000,
    normalPrice: 130000,
    image: '/assets/img/Black Orchid Tom Ford.jpg',
    genero: 'Unisex',
    categoriaId: 'perfumes-unisex',
    tipo: 'Eau de Parfum',
    stock: 25,
    description: 'Lujosa y sensual, Black Orchid es una fragancia rica y oscura de orquídea negra e incienso, moderna y atemporal.'
  },
  {
    id: 3,
    name: 'Burberry Brit',
    brand: 'Burberry',
    price: 72000,
    normalPrice: 85000,
    image: '/assets/img/Burberry Brit Eau de Toilette Burberry.jpg',
    genero: 'Femenino',
    categoriaId: 'perfumes-dama',
    tipo: 'Eau de Toilette',
    stock: 25,
    description: 'Una fragancia clásica y elegante con un toque británico. Notas de pera helada, almendra azucarada y vainilla.'
  },
  {
    id: 4,
    name: 'CH for Men',
    brand: 'Carolina Herrera',
    price: 89000,
    normalPrice: 89000,
    image: '/assets/img/CHPerfumesHombre.avif',
    genero: 'Masculino',
    categoriaId: 'perfumes-varon',
    tipo: 'Eau de Toilette',
    stock: 30,
    description: 'Representa la esencia del estilo de vida elegante de CH. Una fusión de tradición y modernidad con notas de cuero y azafrán.'
  },
  {
    id: 5,
    name: 'Coco Mademoiselle Intense',
    brand: 'Chanel',
    price: 125000,
    normalPrice: 140000,
    image: '/assets/img/Coco Mademoiselle Intense Chanel.webp',
    genero: 'Femenino',
    categoriaId: 'perfumes-dama',
    tipo: 'Eau de Parfum',
    stock: 35,
    description: 'Una versión más profunda y sensual de Coco Mademoiselle. Pachulí extremo y haba tonka para una estela irresistible.'
  },
  {
    id: 6,
    name: 'Creed Aventus',
    brand: 'Creed',
    price: 180000,
    normalPrice: 180000,
    image: '/assets/img/Creed Aventus.webp',
    genero: 'Masculino',
    categoriaId: 'perfumes-varon',
    tipo: 'Eau de Parfum',
    stock: 40,
    description: 'Una fragancia legendaria que celebra la fuerza, el poder y el éxito. Famosa por sus notas de piña ahumada y abedul.'
  },
  {
    id: 7,
    name: 'Dior Homme Intense',
    brand: 'Dior',
    price: 110000,
    normalPrice: 110000,
    image: '/assets/img/Dior Homme Intense Edp 100ml Hombre.webp',
    genero: 'Masculino',
    categoriaId: 'perfumes-varon',
    tipo: 'Eau de Parfum',
    stock: 45,
    description: 'Una fragancia sofisticada y elegante con un corazón de iris, almizcle y cedro. Un clásico moderno de la perfumería masculina.'
  },
  {
    id: 8,
    name: 'Eros',
    brand: 'Versace',
    price: 95000,
    normalPrice: 95000,
    image: '/assets/img/Eros Versace.webp',
    genero: 'Masculino',
    categoriaId: 'perfumes-varon',
    tipo: 'Eau de Toilette',
    stock: 50,
    description: 'Inspirada en el dios griego del amor. Una fragancia vibrante y luminosa con menta, manzana verde y vainilla.'
  },
  {
    id: 9,
    name: 'Explorer',
    brand: 'Montblanc',
    price: 88000,
    normalPrice: 88000,
    image: '/assets/img/Explorer Montblanc.jpg',
    genero: 'Masculino',
    categoriaId: 'perfumes-varon',
    tipo: 'Eau de Parfum',
    stock: 55,
    description: 'Una invitación a un viaje fantástico, un irresistible llamado a la aventura. Notas de vetiver, pachulí y maderas.'
  },
  {
    id: 10,
    name: 'Good Girl',
    brand: 'Carolina Herrera',
    price: 85000,
    normalPrice: 95000,
    image: '/assets/img/Good Girl Carolina Herrera.jpg',
    genero: 'Femenino',
    categoriaId: 'perfumes-dama',
    tipo: 'Eau de Parfum',
    stock: 60,
    description: 'Una fragancia audaz y sofisticada, inspirada en la visión única de Carolina Herrera de la dualidad de la mujer moderna.'
  },
  {
    id: 11,
    name: 'La Nuit de L\'Homme',
    brand: 'Yves Saint Laurent',
    price: 94000,
    normalPrice: 105000,
    image: '/assets/img/La Nuit de L\'Homme Yves Saint Laurent.webp',
    genero: 'Masculino',
    categoriaId: 'perfumes-varon',
    tipo: 'Eau de Toilette',
    stock: 70,
    description: 'Un perfume lleno de tensión y contrastes, para un seductor oscuro y enigmático. Notas de cardamomo, lavanda y vetiver.'
  },
  {
    id: 12,
    name: 'La Vie Est Belle',
    brand: 'Lancôme',
    price: 88000,
    normalPrice: 98000,
    image: '/assets/img/La Vie Est Belle Lancôme.webp',
    genero: 'Femenino',
    categoriaId: 'perfumes-dama',
    tipo: 'Eau de Parfum',
    stock: 80,
    description: 'Una declaración universal a la felicidad. Una fragancia icónica con notas de iris, jazmín y flor de naranjo.'
  },
  {
    id: 13,
    name: 'Le Parfait Pour Homme',
    brand: 'Armaf',
    price: 65000,
    normalPrice: 75000,
    image: '/assets/img/Le Parfait Pour Homme Armaf.webp',
    genero: 'Masculino',
    categoriaId: 'perfumes-varon',
    tipo: 'Eau de Parfum',
    stock: 90,
    description: 'Una fragancia intensa y especiada, diseñada para el hombre moderno que busca la perfección. Notas de piña, bergamota y cuero.'
  },
  {
    id: 14,
    name: 'Azzaro Wanted',
    brand: 'Azzaro',
    price: 73000,
    normalPrice: 83000,
    image: '/assets/img/perfume_azzaro.png',
    genero: 'Masculino',
    categoriaId: 'perfumes-varon',
    tipo: 'Eau de Toilette',
    stock: 6,
    description: 'La fragancia de un hombre deseado. Carismático, talentoso y audaz, todo le sonríe. Notas de limón, jengibre y cardamomo.'
  },
  {
    id: 15,
    name: 'Valentino Uomo Intense',
    brand: 'Valentino',
    price: 105000,
    normalPrice: 118000,
    image: '/assets/img/Valentino Uomo Born In Roma Intense Valentino.jpg',
    genero: 'Masculino',
    categoriaId: 'perfumes-varon',
    tipo: 'Eau de Parfum',
    stock: 5,
    description: 'Una reinterpretación intensa del clásico. Carácter carismático y vibrante con un toque de vainilla y vetiver.'
  },
];

// --- 3. FUNCIONES CRUD USANDO LOCALSTORAGE ---

export const getAllProducts = () => {
  return new Promise((resolve) => {
    // Simulamos un pequeño retraso
    setTimeout(() => {
      const productsJSON = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      let products = [];
      if (productsJSON) {
        try {
          products = JSON.parse(productsJSON);
        } catch (error) {
          console.error("Error al parsear productos de localStorage:", error);
          products = [...initialProducts]; // Usar iniciales si hay error
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
        }
      } else {
        products = [...initialProducts]; // Usar y guardar iniciales si no existen
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
      }
      resolve(products);
    }, 500);
  });
};


export const getProductById = (id) => {
  return new Promise(async (resolve, reject) => { // Usamos async para esperar a getAllProducts
    try {
      // Esperamos a que se carguen los productos de localStorage
      const products = await getAllProducts();
      // Aseguramos que el ID sea número
      const productId = parseInt(id);
      const product = products.find(p => p.id === productId);
      if (product) {
        resolve({ ...product }); // Devolver una copia
      } else {
        reject(new Error('Producto no encontrado'));
      }
    } catch (error) {
      reject(error); // Rechazar si getAllProducts falla
    }
  });
};


export const createProduct = (productData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await getAllProducts(); // Leer actuales

      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const newProduct = {
        ...productData,
        id: newId,
        // Asegurar que los números sean números
        price: Number(productData.price) || 0,
        normalPrice: Number(productData.normalPrice) || 0,
        stock: Number(productData.stock) || 0,
      };

      products.push(newProduct); // Añadir a la lista
      // Guardar la lista COMPLETA actualizada
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));

      resolve(newProduct);
    } catch (error) {
      reject(error);
    }
  });
};


export const updateProduct = (id, updates) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await getAllProducts(); // Leer actuales
      const productId = parseInt(id);
      const index = products.findIndex(p => p.id === productId);

      if (index !== -1) {
        // Crear el objeto actualizado
        const updatedProduct = {
          ...products[index], // Datos antiguos
          ...updates,         // Nuevos datos (pueden sobrescribir)
          // Re-asegurar que los números sean números
          price: Number(updates.price) ?? products[index].price, // Usar ?? por si viene 0
          normalPrice: Number(updates.normalPrice) ?? products[index].normalPrice,
          stock: Number(updates.stock) ?? products[index].stock,
        };

        products[index] = updatedProduct; // Reemplazar en la lista
        // Guardar la lista COMPLETA actualizada
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));

        resolve({ ...updatedProduct }); // Devolver copia actualizada
      } else {
        reject(new Error('No se pudo actualizar: Producto no encontrado'));
      }
    } catch (error) {
      reject(error);
    }
  });
};


export const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await getAllProducts(); // Leer actuales
      const productId = parseInt(id);
      const initialLength = products.length;

      // Crear NUEVA lista filtrada
      products = products.filter(p => p.id !== productId);

      if (products.length < initialLength) { // Si se eliminó algo
        // Guardar la lista COMPLETA filtrada
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
        resolve({ message: 'Producto eliminado con éxito.' }); // Éxito
      } else {
        reject(new Error('No se pudo eliminar: Producto no encontrado'));
      }
    } catch (error) {
      reject(error);
    }
  });
};