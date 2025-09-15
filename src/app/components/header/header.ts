import { Component, inject } from '@angular/core';
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
  styleUrl: './header.scss'
  
})
export class Header {
  public cartCount = 0;
  private cartService = inject(CartService);
  hidden = true;

  constructor(){
    this.cartService.cartCount$.subscribe (count => {
      this.cartCount = count;
      if (count === 0){
         this.hidden = true;
      } else{
        this.hidden = false;
      }
    })
  }

}
