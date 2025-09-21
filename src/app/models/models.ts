export interface Coffee {
    id: number,
    titulo: string,
    descricao: string,
    preco: number,
    imagem: string,
    availableInStock: number
}

export interface CartItem{
    coffee: Coffee,
    quantity: number
}
