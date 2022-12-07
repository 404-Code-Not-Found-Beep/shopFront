import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StoreFrontComponent } from './store-front/store-front.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: AppComponent},
  { path: 'items', component: StoreFrontComponent },
  {path: 'items/new', component: AddItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
