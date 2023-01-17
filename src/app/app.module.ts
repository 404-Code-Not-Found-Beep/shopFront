import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreFrontComponent } from './store-front/store-front.component';
import { HeaderComponent } from './header/header.component';
import { CarouselModule } from 'primeng/carousel';
import { CarouselComponent } from './carousel/carousel.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartIconComponent } from './cart/cart-icon/cart-icon.component';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { BooksComponent } from './store-front/books/books.component';
import { ShirtsComponent } from './store-front/shirts/shirts.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { SingleItemComponent } from './single-item/single-item.component';
import { ManagementComponent } from './management/management.component';
import { ManagementFormComponent } from './management/management-form/management-form.component';
import { ManagementEditItemComponent } from './management/management-edit-item/management-edit-item.component';
import { ManagementAddItemComponent } from './management/management-add-item/management-add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreFrontComponent,
    HeaderComponent,
    CarouselComponent,
    HomePageComponent,
    CartIconComponent,
    SearchBarComponent,
    CheckoutComponent,
    DropdownDirective,
    BooksComponent,
    ShirtsComponent,
    SearchPipe,
    SingleItemComponent,
    ManagementComponent,
    ManagementFormComponent,
    ManagementEditItemComponent,
    ManagementAddItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CarouselModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
