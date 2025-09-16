import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../../components/product-card/product-card';
import { LoadingCard } from "../../components/loading-card/loading-card";
import { Coffee } from '../../models/models';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, LoadingCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  public productService = inject(ProductService);
  public coffees = toSignal(this.productService.getProducts())

    
  selectedCoffee: Coffee | null = null;

  selectCoffee(coffee: Coffee) {
    this.selectedCoffee = coffee;
  }
}
