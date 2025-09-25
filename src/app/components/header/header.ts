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
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  hidden = true;
  cartCount = this.cartService.getCartCount();
  isAuthenticated = signal(false);
  isAdmin = signal(false); // ✅ agora é um sinal reativo

  constructor() {
    effect(() => {
      const authenticated = this.authService.isAuthenticated();
      this.isAuthenticated.set(authenticated);
      this.isAdmin.set(authenticated && this.authService.isAdmin()); // ✅ só define admin se estiver autenticado
      this.hidden = this.cartCount() <= 0;
    });
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated.set(false);
    this.isAdmin.set(false); // ✅ limpa role admin
    this.snackBar.open("Usuário deslogado", "FECHAR", {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ['snackbar-success']
    });
  }
}