import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }  
    
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(products);
            } else return [];
        } catch (error) {
            console.log(error); 
        }
    }

    async addProduct () {
        try {
            const product = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            const products = await this.getProducts();
            const productExist = products.find((p) => p.title === product.title);
            if (productExist) return "Product already exists";
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log(error); 
        }
    }


    async getProductById (id) {
        try {
            const products = await this.getProducts();
            let idProduct = products.find((product) => product.id === id);
            if (!idProduct) return null; 
            return idProduct;  
        } 
        catch (error) {
            console.log(error);
        }
    }
}