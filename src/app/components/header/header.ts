import { Component, effect, computed, inject, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadge } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatBadge, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header {
  private cartService = inject(CartService);
  hidden = true;
  cartCount = this.cartService.getCartCount();

  constructor() {
    effect(() => {
      this.hidden = this.cartCount() <= 0;
    });

  }

}
