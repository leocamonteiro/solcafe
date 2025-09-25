import { Injectable, signal, WritableSignal, Signal, inject } from '@angular/core';
import { CartItem, Coffee } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsArray: Array<CartItem> = [];
  private totalPrice: WritableSignal<number> = signal<number>(0);
  private cartCount: WritableSignal<number> = signal<number>(0);

  constructor() {
    this.cartItemsArray = JSON.parse(localStorage.getItem("cartArray") || "[]");
    this.updateCart();
  }

  private updateCart(): void {
    const total = this.cartItemsArray.reduce((acc, item) => acc + (item.coffee.preco * item.quantity), 0);
    const count = this.cartItemsArray.reduce((acc, item) => acc + item.quantity, 0);

    this.totalPrice.set(total);
    this.cartCount.set(count);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsArray;
  }

  getCartCount(): Signal<number> {
    return this.cartCount.asReadonly();
  }

  getTotalPrice(): Signal<number>  {
    return this.totalPrice.asReadonly();
  }

  addItemToCart(coffee: Coffee): { message: string, warning: boolean } {
    const index = this.cartItemsArray.findIndex(item => coffee.id === item.coffee.id);

    if (index !== -1) {
      const quantity = this.cartItemsArray[index].quantity;

      if (quantity >= coffee.availableInStock) {
        return {
          message: "Estoque insuficiente!",
          warning: true
        }
      }

      this.cartItemsArray[index].quantity = quantity + 1;
      
    } else {
      this.cartItemsArray.push({ coffee, quantity: 1 });
    }
    console.log(this.cartItemsArray)
    this.updateCart();
    localStorage.setItem("cartArray", JSON.stringify(this.cartItemsArray));
    return {
      message: "Item adicionado ao carrinho",
      warning: false
    }
  }

  removeItemFromCart(coffee: Coffee): { message: string, warning: boolean }{
   const index = this.cartItemsArray.findIndex(item => coffee.id === item.coffee.id);

    if (index !== -1) {
      const quantity = this.cartItemsArray[index].quantity;
      this.cartItemsArray[index].quantity = quantity - 1;

      if(this.cartItemsArray[index].quantity === 0){
        this.cartItemsArray.splice(index, 1);
      }
    } else {
      return {
        message: "Item não está no carrinho!",
        warning: true
      }
    }

    this.updateCart();
    localStorage.setItem("cartArray", JSON.stringify(this.cartItemsArray));
    return {
      message: "Item removido do carrinho",
      warning: true
    }
      
  }

  clearCart(): void {
    this.cartItemsArray = [];
    localStorage.setItem("cartArray", JSON.stringify([])); // sobrescreve com array vazio
    this.updateCart();
  }
}