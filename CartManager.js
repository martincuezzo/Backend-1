import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            if (!fs.existsSync(this.path)) return [];
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer carritos:', error);
            return [];
        }
    }

    async createCart() {
        const carts = await this.getCarts();
        const id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
        const newCart = { id, products: [] };
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getCartById(id) {
        if (isNaN(id)) {
            throw new Error('El ID debe ser un número válido');
        }

        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id) || null;
    }

    async addProductToCart(cartId, productId) {
        if (isNaN(cartId) || isNaN(productId)) {
            throw new Error('El ID del carrito y del producto deben ser números válidos');
        }

        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === cartId);

        if (!cart) throw new Error(`El carrito con ID ${cartId} no existe`);

        // Validar que el producto exista en products.json
        const products = await fs.promises.readFile('./products.json', 'utf-8');
        const productList = JSON.parse(products);
        if (!productList.some(product => product.id === productId)) {
            throw new Error(`El producto con ID ${productId} no existe`);
        }

        // Agregar o actualizar el producto en el carrito
        const product = cart.products.find(p => p.product === productId);

        if (product) {
            product.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return cart;
    }
}

export default CartManager;