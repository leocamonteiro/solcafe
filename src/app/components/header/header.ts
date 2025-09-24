import { Component, effect, computed, inject, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadge } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatBadge, RouterLink, MatSnackBarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header {
  private cartService = inject(CartService);
  hidden = true;
  cartCount = this.cartService.getCartCount();
  isAuthenticated = signal(false); 

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    effect(() => {
      this.hidden = this.cartCount() <= 0;
      this.isAuthenticated.set(this.authService.isAuthenticated());
    });
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated.set(false);
    this.snackBar.open("Usuário deslogado", "FECHAR", {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ['snackbar-success']
    });
  }
}
