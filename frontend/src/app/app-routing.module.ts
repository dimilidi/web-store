import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/common-pages/home/home.component';
import { ProductPageComponent } from './components/pages/store-pages/product-page/product-page.component';
import { CartPageComponent } from './components/pages/store-pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/common-pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/common-pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/store-pages/checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/store-pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/store-pages/order-track-page/order-track-page.component';
import { EditAccountPageComponent } from './components/pages/common-pages/edit-account-page/edit-account-page.component';
import { OrdersPageComponent } from './components/pages/store-pages/orders-page/orders-page.component';
import { AccountPageComponent } from './components/pages/common-pages/account-page/account-page.component';
import { DeleleAccountPageComponent } from './components/pages/common-pages/delele-account-page/delele-account-page.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { DashboardComponent } from './components/pages/dashboard-pages/dashboard/dashboard.component';
import { adminGuard } from './auth/guards/admin.guard';
import { ForgottenPasswordComponent } from './components/pages/common-pages/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './components/pages/common-pages/reset-password/reset-password.component';
import { OrdersListComponent } from './components/pages/dashboard-pages/orders-list/orders-list.component';
import { UsersListComponent } from './components/pages/dashboard-pages/users-list/users-list.component';
import { ProductsListComponent } from './components/pages/dashboard-pages/products-list/products-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'forgotten-password', component: ForgottenPasswordComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'all-orders',
    component: OrdersListComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [authGuard, adminGuard],
  },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  {
    path: 'account',
    component: AccountPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-account',
    component: EditAccountPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'delete-account',
    component: DeleleAccountPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'payment',
    component: PaymentPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'track/:orderId',
    component: OrderTrackPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    component: OrdersPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'products',
    component: ProductsListComponent,
    canActivate: [authGuard, adminGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
