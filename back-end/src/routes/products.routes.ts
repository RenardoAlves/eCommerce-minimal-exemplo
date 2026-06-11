import { Router } from 'express'
import { products } from '../data/products.ts'

const router = Router();

router.get("/", (req, res) => {
    res.json(products);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            erro: "Produto não encontrado"
        });
    }

    res.json(product);
})

export default router;