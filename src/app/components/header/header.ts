import { Component, effect, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadge } from '@angular/material/badge';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';

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
  private router = inject(Router);

  hidden = true;
  cartCount = this.cartService.getCartCount();
  isAuthenticated = signal(false);
  isAdmin = signal(false);
  currentRoute = signal(''); // ✅ sinal reativo para exibir a rota atual

  constructor() {
    effect(() => {
      const authenticated = this.authService.isAuthenticated();
      this.isAuthenticated.set(authenticated);
      this.isAdmin.set(authenticated && this.authService.isAdmin());
      this.hidden = this.cartCount() <= 0;
    });

    // ✅ escuta mudanças de rota e atualiza o nome da página
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const label = this.getRouteLabel(event.urlAfterRedirects);
      this.currentRoute.set(label);
    });
  }

  getRouteLabel(url: string): string {
    const routeMap: { [key: string]: string } = {
      '/': 'Home',
      '/menu': 'Cardápio',
      '/user-panel': 'Painel de Usuários',
      '/checkout': 'Checkout',
      '/auth': 'Login'
    };
    return routeMap[url] || 'Página';
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated.set(false);
    this.isAdmin.set(false);
    this.snackBar.open("Usuário deslogado", "FECHAR", {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ['snackbar-success']
    });
  }
}