import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (!fs.existsSync(this.path)) return [];
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer productos :', error);
            return [];
        }
    }

    async addProduct({ title, description, price, thumbnails = [], code, stock, category, status = true }) {
        const products = await this.getProducts();

        // Validar que el código no se repita
        if (products.some(product => product.code === code)) {
            throw new Error(`El código "${code}" ya existe`);
        }

        // Validar que todos los campos requeridos estén presentes
        if (!title || !description || !price || !code || !stock || !category) {
            throw new Error('Todos los campos requeridos (title, description, price, code, stock, category) deben estar presentes');
        }

        // Validar que el precio y el stock sean números válidos
        if (typeof price !== 'number' || price <= 0) {
            throw new Error('El precio debe ser un número mayor a 0');
        }

        if (typeof stock !== 'number' || stock < 0) {
            throw new Error('El stock debe ser un número mayor o igual a 0');
        }

        // Generar un ID único
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        // Crear el nuevo producto
        const newProduct = { id, title, description, price, thumbnails, code, stock, category, status };

        // Agregar el producto a la lista
        products.push(newProduct);

        // Guardar en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

        return newProduct;
    }

    async getProductById(id) {
        if (isNaN(id)) {
            throw new Error('El ID debe ser un número válido');
        }

        const products = await this.getProducts();
        return products.find(product => product.id === id) || null;
    }

    async updateProduct(id, updatedData) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index === -1) throw new Error(`El producto con ID ${id} no existe`);

        // No permitir actualizar el campo ID
        delete updatedData.id;

        products[index] = { ...products[index], ...updatedData };

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

        return products[index];
    }

    async deleteProductById(id) {
        if (isNaN(id)) {
            throw new Error('El ID debe ser un número válido');
        }

        const products = await this.getProducts();
        const newProducts = products.filter(product => product.id !== id);

        if (products.length === newProducts.length) {
            throw new Error(`El producto con ID ${id} no existe`);
        }

        await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2));
    }
}

export default ProductManager;