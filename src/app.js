import express from "express";
import ProductManager from "./productManager.js"; 

const productManager = new ProductManager("./src/products.json");

const app = express();

app.use(express.json());

app.get("/products", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        let limit = parseInt(req.query.limit);
        if (limit >= 0) {
            let newProducts = products.slice (0, limit)
            res.status(200).json(newProducts);
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
});

app.get("/products/:pid", async (req, res) => {
    
    const products = await productManager.getProducts();
    let pid = parseInt(req.params.pid);
    let product = products.find(product => product.id === pid);
    if(product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({msg:"Product not found"});
    }

});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`)); 