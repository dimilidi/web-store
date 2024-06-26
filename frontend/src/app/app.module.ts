import { NgModule } from '@angular/core';
import { NgParticlesModule } from 'ng-particles';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/pages/common-pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { ProductPageComponent } from './components/pages/store-pages/product-page/product-page.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { RouterModule } from '@angular/router';
import { CartPageComponent } from './components/pages/store-pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { LoginPageComponent } from './components/pages/common-pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import TextInputComponent from './components/partials/text-input/text-input.component';
import { ButtonComponent } from './components/partials/button/button.component';
import { RegisterPageComponent } from './components/pages/common-pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/store-pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './components/pages/store-pages/payment-page/payment-page.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { StarRatingComponent } from './components/partials/star-rating/star-rating.component';
import { OrderTrackPageComponent } from './components/pages/store-pages/order-track-page/order-track-page.component';
import { EditAccountPageComponent } from './components/pages/common-pages/edit-account-page/edit-account-page.component';
import { OrdersPageComponent } from './components/pages/store-pages/orders-page/orders-page.component';
import { AccountPageComponent } from './components/pages/common-pages/account-page/account-page.component';
import { DeleleAccountPageComponent } from './components/pages/common-pages/delele-account-page/delele-account-page.component';
import { ParticalBackgroundComponent } from './components/partials/partical-background/partical-background.component';
import { DashboardComponent } from './components/pages/dashboard-pages/dashboard/dashboard.component';
import { DialogComponent } from './components/partials/dialog/dialog.component';
import { VisibilityIconComponent } from './components/partials/visibility-icon/visibility-icon.component';
import { CardComponent } from './components/partials/card/card.component';
import { ResetPasswordComponent } from './components/pages/common-pages/reset-password/reset-password.component';
import { ForgottenPasswordComponent } from './components/pages/common-pages/forgotten-password/forgotten-password.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { IntlTelInputDirective } from './directives/intl-tel-input.directive';
import { OrdersListComponent } from './components/pages/dashboard-pages/orders-list/orders-list.component';
import { UsersListComponent } from './components/pages/dashboard-pages/users-list/users-list.component';
import { NavigationComponent } from './components/partials/navigation/navigation.component';
import { ThemeToggleComponent } from './components/partials/theme-toggle/theme-toggle.component';
import { ProductsListComponent } from './components/pages/dashboard-pages/products-list/products-list.component';
import { SidebarToggleComponent } from './components/partials/sidebar-toggle/sidebar-toggle.component';
import { OrdersTableComponent } from './components/partials/orders-table/orders-table.component';
import { LogoComponent } from './components/partials/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    ProductPageComponent,
    TagsComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoadingComponent,
    LoginPageComponent,
    InputValidationComponent,
    InputContainerComponent,
    TextInputComponent,
    ButtonComponent,
    RegisterPageComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentPageComponent,
    PaypalButtonComponent,
    StarRatingComponent,
    OrderTrackPageComponent,
    AccountPageComponent,
    EditAccountPageComponent,
    OrdersPageComponent,
    DeleleAccountPageComponent,
    ParticalBackgroundComponent,
    DashboardComponent,
    DialogComponent,
    VisibilityIconComponent,
    CardComponent,
    ResetPasswordComponent,
    ForgottenPasswordComponent,
    FooterComponent,
    IntlTelInputDirective,
    OrdersListComponent,
    UsersListComponent,
    NavigationComponent,
    ThemeToggleComponent,
    ProductsListComponent,
    SidebarToggleComponent,
    OrdersTableComponent,
    LogoComponent,
  ],
  imports: [
    NgParticlesModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
