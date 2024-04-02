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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './component/profile/account/account.component';
import { WishlistComponent } from './component/profile/wishlist/wishlist.component';
import { OrderhistoryComponent } from './component/profile/orderhistory/orderhistory.component';
import { AddressComponent } from './component/profile/account/address/address.component';

import { InterceptorInterceptor } from './services/interceptors/interceptor.interceptor';

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
    AddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
