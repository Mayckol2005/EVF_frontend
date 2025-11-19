# Evaluacion-2-DesarrolloFullstack-2

Repositorio dedicado a la segunda evaluación de la asignatura Desarrollo Fullstack II. Este proyecto toma la base de un proyecto anterior (Evaluación 1) y lo migra a una **Single Page Application (SPA)** utilizando **React**.

La aplicación es un e-commerce de perfumes ("DuocFragancias") que implementa un catálogo de productos, carrito de compras y un panel de administración.

## ✨ Características Principales

* **Catálogo de Productos:** Visualización de productos en la "Tienda".
* **Detalle de Producto:** Página individual para cada perfume.
* **Carrito de Compras:** Funcionalidad completa para agregar, eliminar y visualizar productos en el carrito usando **Context API** (`CartContext`).
* **Autenticación:** Sistema de Login y Registro, manejando el estado de autenticación global con **Context API** (`AuthContext`).
* **Rutas Protegidas:** Uso de `ProtectedRoute` para asegurar las rutas del panel de administrador, permitiendo el acceso solo a usuarios con el rol "administrador".
* **Panel de Administración:** Vistas para gestionar productos y usuarios (Dashboard, Gestión de Productos, Gestión de Usuarios).
* **Routing:** Navegación fluida sin recargar la página gracias a **React Router**.
* **Diseño Responsivo:** Maquetación realizada con **Bootstrap**.

## 💻 Tecnologías Utilizadas

* **React:** Biblioteca principal para la construcción de la interfaz de usuario.
* **React Router (v6):** Para el manejo de rutas del lado del cliente.
* **Context API (React):** Para el manejo de estado global (autenticación y carrito).
* **Bootstrap:** Para el diseño y los componentes de la interfaz.
* **Karma:** Como *Test Runner* (corredor de pruebas).
* **Jasmine:** Como *Framework* de pruebas (para `describe`, `it`, `expect`).
* **Webpack:** Para el empaquetado de módulos (utilizado por Karma).

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para levantar el proyecto en tu máquina local.

### 1. Clonar el repositorio

```bash
# Reemplaza [URL-DEL-REPO] con la URL SSH o HTTPS de tu repositorio
git clone [URL-DEL-REPO]/Evaluacion-2-DesarrolloFullstack-2.git
````

### 2\. Navegar a la carpeta del proyecto

**Importante:** Según tus logs, el proyecto está dentro de una subcarpeta llamada `Proyecto`.

```bash
cd Evaluacion-2-DesarrolloFullstack-2/Proyecto
```

### 3\. Instalar dependencias

Este comando leerá el `package.json` e instalará React, Bootstrap, Karma, Jasmine y todas las demás dependencias necesarias.

```bash
npm install
```

-----

## 📜 Scripts Disponibles

Dentro de la carpeta `Proyecto`, puedes ejecutar los siguientes comandos:

### `npm start`

Inicia la aplicación en modo de desarrollo.
Abre [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) para verla en tu navegador.

La página se recargará automáticamente si realizas cambios en el código.

### `npm run test:karma`

Ejecuta la suite de pruebas configurada con Karma y Jasmine.
Este comando lanzará un navegador (Chrome Headless) y te mostrará los resultados de las pruebas directamente en la consola. Es ideal para verificar que los componentes principales funcionan como se espera.

### `npm run build`

Genera una versión optimizada de la aplicación para producción.
El resultado se guarda en la carpeta `build/`, lista para ser desplegada en un servidor web.
