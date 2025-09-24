import { Component, Input, inject, signal, effect, computed } from '@angular/core';
import { Coffee } from '../../models/models';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  imports: [ CommonModule, CurrencyPipe, MatIcon, MatIconButton ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() coffee!: Coffee
  imageLoaded: boolean = false;
  private snackBar = inject(MatSnackBar);
  isAdmin = computed(() => this.authService.isAdmin());

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ){
  }

  showSnackBar(texto: string, aviso: boolean){
    this.snackBar.open(texto, "FECHAR", {
      duration: 1000,
      verticalPosition: "top",
      panelClass: [aviso ? 'snackbar-failure' : 'snackbar-success']
    })
  }  

  clickButton(command: string, coffeeItem: Coffee){
    let result = { message: '', warning: false }
    if(command === "add"){
      result = this.cartService.addItemToCart(coffeeItem);
    } else if (command === "remove"){
      result = this.cartService.removeItemFromCart(coffeeItem);
    }
    this.showSnackBar(result.message, result.warning)
  }

  onImageLoad(){
    this.imageLoaded = true;
  }
}
