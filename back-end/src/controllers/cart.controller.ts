import type { Request, Response } from "express";
import { cart } from "../data/cartDb.ts";
import { products } from "../data/products.ts";

export const getCart = (req: Request, res: Response) => {
    res.json(cart);
};

export const addItem = (req: Request, res: Response) => {
    const { id } = req.params;

    const product = products.find(p => p.id === Number(id))

    if (!product) {
        return res.status(404).json({ erro: "Produto não encontrado" })
    }

    const existing = cart.find(p => p.id === Number(id));

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    res.json(cart);
};

export const removeItem = (req: Request, res: Response) => {
    const { id } = req.params;

    const index = cart.findIndex(p => p.id === Number(id));

    if (index !== -1) {
        cart.splice(index, 1);
    }

    res.json(cart);
};

export const incrementItem = (req: Request, res: Response) => {
    const { id } = req.params;

    const item = cart.find(p => p.id === Number(id));

    if (!item) {
        return res.status(404).json({ error: "Item não encontrado" });
    }

    item.quantity += 1;

    res.json(cart);
}

export const subtractItem = (req: Request, res: Response) => {
    const { id } = req.params;

    const index = cart.findIndex(p => p.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ error: "Item não encontrado" });
    }

    const item = cart[index];

    if (!item) {
        return res.status(404).json({ error: "Erro ao processar item" });
    }

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    res.json(cart);
}