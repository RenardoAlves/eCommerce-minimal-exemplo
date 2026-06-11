import GridProdutos from "../components/GridProdutos"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" 
import { Button } from "@/components/ui/button"
import axios from 'axios'

function HomePage() {

    type Product = {
        id: number,
        name: string,
        image: string,
        price: string
    }

    const [products, setProdutos] = useState<Product[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products`).then(res => res.json()).then(data => setProdutos(data));
    }, []);

    const addCart = async (product: Product) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/cart/${product.id}`)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <GridProdutos>
            {products.map(product => (
                <Card key={product.id}>
                    <CardHeader className="flex flex-col items-center">
                        <CardTitle>{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-5">
                        <img className="max-h-40" src={product.image}></img>
                        <p>Preço: R${product.price}</p>
                        <Button onClick={() => addCart(product)}>Adicionar ao carrinho</Button>
                    </CardContent>
                </Card>
            ))}
        </GridProdutos>
    )
}

export default HomePage