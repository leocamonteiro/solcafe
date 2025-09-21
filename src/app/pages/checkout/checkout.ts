import { Component, Signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem, Coffee } from '../../models/models';
import { CurrencyPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe, MatIconButton, MatIcon],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  cartItems: CartItem[] = [];
  cartCount: Signal<number>;
  cartTotalPrice: Signal<number>;

  constructor(private cartService: CartService){
    this.cartItems = cartService.getCartItems();
    this.cartCount = cartService.getCartCount();
    this.cartTotalPrice = cartService.getTotalPrice();
  }

  removeButton(coffee: Coffee){
    this.cartService.removeItemFromCart(coffee);
  }
}
