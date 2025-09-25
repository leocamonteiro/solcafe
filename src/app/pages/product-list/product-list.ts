import { Component, inject, computed, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';
import { LoadingCard } from "../../components/loading-card/loading-card";
import { Coffee } from '../../models/models';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialog } from '../../components/edit-product-dialog/edit-product-dialog';
import { AddProductDialog } from '../../components/add-product-dialog/add-product-dialog';


@Component({
  selector: 'app-product-list',
  imports: [ProductCard, LoadingCard, MatIcon],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  coffees = signal<Coffee[]>([]);
  selectedCoffee: Coffee | null = null;
  isAdmin = computed(() => this.authService.isAdmin());

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => this.coffees.set(data),
      error: () => console.error('Erro ao carregar produtos')
    });
  }

  selectCoffee(coffee: Coffee) {
    this.selectedCoffee = coffee;

    const dialogRef = this.dialog.open(EditProductDialog, {
      data: coffee
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts(); 
      }
    });
  }

 addNewProduct() {
  const dialogRef = this.dialog.open(AddProductDialog);

  dialogRef.afterClosed().subscribe((newProduct: Coffee | null) => {
    if (newProduct) {
      this.loadProducts();
    }
  });
 }

}