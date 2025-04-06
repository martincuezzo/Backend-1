# API de Gestión de Productos y Carritos

Este proyecto es una API desarrollada en **Node.js** y **Express** que permite gestionar productos y carritos de compra. La información se persiste en archivos JSON (`products.json` y `carts.json`).

## **Características**

- Gestión de productos:
  - Listar todos los productos.
  - Obtener un producto por su ID.
  - Agregar un nuevo producto.
  - Actualizar un producto existente.
  - Eliminar un producto por su ID.
- Gestión de carritos:
  - Crear un nuevo carrito.
  - Listar los productos de un carrito por su ID.
  - Agregar productos a un carrito existente.

## **Requisitos**

- Node.js (versión 14 o superior)
- Postman (o cualquier cliente HTTP para probar la API)

## **Instalación**

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
2. Instala las dependencias:
   ```bash
   npm install
4. Inicia el servidor:
   ```bash
   node app.js
