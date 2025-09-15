import { Injectable } from '@angular/core';
import { CartItem, Coffee } from '../models/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: Array<CartItem> = [];

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$: Observable<number> = this.cartCountSubject.asObservable();

  getAllItems() {
    return this.cartItems;
  }

  addItem(coffee: Coffee) {
    const index = this.cartItems.findIndex(item => coffee.id === item.coffee.id);
    if (index !== -1) {
      this.cartItems[index].quantity++;
    } else {
      this.cartItems.push({ coffee, quantity: 1 });
    }

    this.cartItemsSubject.next([...this.cartItems]);
    this.updateCartCount();
  }

  private updateCartCount() {
    const total = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(total);
  }
}