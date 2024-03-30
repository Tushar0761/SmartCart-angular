import { ProductViewComponent } from './component/product-view/product-view.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './component/profile/account/account.component';
import { WishlistComponent } from './component/profile/wishlist/wishlist.component';
import { OrderhistoryComponent } from './component/profile/orderhistory/orderhistory.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    ProductViewComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    ProfileComponent,
    CartComponent,
    OrderComponent,
    AccountComponent,
    WishlistComponent,
    OrderhistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
