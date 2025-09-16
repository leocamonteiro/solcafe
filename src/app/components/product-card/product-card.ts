import { Component, Input, inject } from '@angular/core';
import { Coffee } from '../../models/models';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private cartService: CartService
  ){}

  clickButton(command: string, coffeeItem: Coffee){
    if(command === "add"){
      this.cartService.addItem(coffeeItem);
      this.snackBar.open("Item adicionado ao carrinho", "", {duration: 2000})
    }
  }

  onImageLoad(){
    this.imageLoaded = true;
  }
}
