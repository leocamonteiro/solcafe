import { Component, Input, inject, computed } from '@angular/core';
import { Coffee } from '../../models/models';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialog } from '../edit-product-dialog/edit-product-dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-product-card',
  imports: [ CommonModule, CurrencyPipe, MatIcon, MatIconButton ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() coffee!: Coffee;
  imageLoaded: boolean = false;
  private snackBar = inject(MatSnackBar);
  isAdmin = computed(() => this.authService.isAdmin());

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  showSnackBar(texto: string, aviso: boolean){
    this.snackBar.open(texto, "FECHAR", {
      duration: 1000,
      verticalPosition: "top",
      panelClass: [aviso ? 'snackbar-failure' : 'snackbar-success']
    });
  }

  clickButton(command: string, coffeeItem: Coffee){
    let result = { message: '', warning: false };

    if(command === "addToCart"){
      result = this.cartService.addItemToCart(coffeeItem);
      this.showSnackBar(result.message, result.warning);
    } else if (command === "removeFromCart"){
      result = this.cartService.removeItemFromCart(coffeeItem);
      this.showSnackBar(result.message, result.warning);
    } else if (command === "editFromStore"){
      const dialogRef = this.dialog.open(EditProductDialog, {
        width: '400px',
        data: coffeeItem
      });

      dialogRef.afterClosed().subscribe(updatedProduct => {
        if (updatedProduct) {
          this.productService.editProduct(updatedProduct).subscribe({
            next: () => this.showSnackBar("Produto atualizado com sucesso!", false),
            error: () => this.showSnackBar("Erro ao atualizar produto!", true)
          });
        }
      });
    } else if (command === "removeFromStore"){
      const dialogRef = this.dialog.open(ConfirmDialog, {
        width: '300px',
        data: { titulo: coffeeItem.titulo }
      });

      dialogRef.afterClosed().subscribe(confirm => {
        if (confirm) {
          this.productService.removeProduct(coffeeItem.id).subscribe({
            next: () => this.showSnackBar("Produto removido com sucesso!", false),
            error: () => this.showSnackBar("Erro ao remover produto!", true)
          });
        }
      });
    }
  }

  onImageLoad(){
    this.imageLoaded = true;
  }
}