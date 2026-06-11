import { useEffect, useState } from "react";
import axios from 'axios'
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import type { CartItem } from "@/types/CartItem";

function CartPage() {

    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`);
                const data = await res.json();
                setCart(data);
                console.log("DATA DA API:", data);
                console.log("CART STATE:", cart);
            } catch (err) {
                console.error("Erro ao carregar carrinho");
            } finally {
                setLoading(false);
            }
        }

        loadCart();

    }, []);

    const deletarItem = async (product: any) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${product.id}`)
            setCart(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const incrementarItem = async (product: any) => {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/${product.id}/increment`);
            setCart(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const subtrairItem = async (product: any) => {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/${product.id}/subtract`);
            setCart(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const subtotal = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    return(
        <div className="bg-white mt-5 w-[97.5vw] py-8 px-15 flex flex-col rounded-md">
            <div className="bg-white w-full flex flex-row">
                <div className="basis-256 mr-10 bg-white flex flex-col gap-10">
                    { loading ? (
                    <Card>
                        <CardAction className="ml-2">Carregando...</CardAction>
                        <CardContent className="flex flex-row">
                            <div>Carregando...</div>
                            <div className="ml-auto">Carregando...</div>
                        </CardContent>
                        <CardDescription className="ml-2">Carregando</CardDescription>
                    </Card>
                    )
                    :
                    (
                    cart.map(product => (
                    <Card key={product.id}>
                        <CardAction className="ml-2">{product.name}</CardAction>
                        <CardContent className="flex flex-row">
                            <div><img src={product.image} className="max-h-[80px]"></img></div>
                            <div className="ml-auto flex flex-col">
                                <p>Valor unitário: R${product.price}</p>
                                <Button onClick={() => deletarItem(product)} className="hover:bg-red-400 ml-auto">Remover</Button>
                            </div>
                        </CardContent>
                        <CardDescription className="ml-2 flex flex-row gap-1">
                            <Button onClick={() => subtrairItem(product)} size="icon-xs">-</Button>
                            <p>Quantidade: {product.quantity}</p>
                            <Button onClick={() => incrementarItem(product)} size="icon-xs">+</Button>
                        </CardDescription>
                    </Card>
                    )))}
                </div>
                <div className="basis-128 bg-white ml-auto">
                    <Card>
                        <CardAction className="ml-4 text-lg">Detalhes do pagamento</CardAction>
                        <CardContent>
                            <div>Total de itens: {cart.length}</div>
                        </CardContent>
                        <CardFooter className="flex flex-col mr-auto">
                            <div className="mr-auto">Subtotal: R${subtotal}</div>
                            <div>Desconto no pix (10%): R${subtotal/10}</div>
                            <div className="mr-auto">Valor final: R${subtotal - subtotal/10}</div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className="bg-white mt-10 w-full flex flex-row">
                <div className="ml-auto">
                    <Button className="text-lg p-5">
                        Finalizar pedido
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartPage