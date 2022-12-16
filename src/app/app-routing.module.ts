import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { BooksComponent } from './store-front/books/books.component';
import { ShirtsComponent } from './store-front/shirts/shirts.component';
import { StoreFrontComponent } from './store-front/store-front.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomePageComponent},
  { path: 'items', component: StoreFrontComponent },
  {path: 'checkout', component: CheckoutComponent},
  {path: 'books', component: BooksComponent},
  {path: 'shirts', component: ShirtsComponent},
  {path: ':id', component : SingleItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
