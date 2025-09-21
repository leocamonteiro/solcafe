import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductList } from './pages/product-list/product-list';
import { Checkout } from './pages/checkout/checkout';
import { Auth } from './pages/auth/auth';
import { UserPanel } from './pages/user-panel/user-panel';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'menu', component: ProductList},
    {path: 'checkout', component: Checkout},
    {path: 'auth', component: Auth},
    {path: 'userpanel', component: UserPanel},
    {path: '**', component: NotFound}
];
