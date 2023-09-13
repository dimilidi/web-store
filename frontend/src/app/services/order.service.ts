import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ORDERS_URL, ORDER_CREATE_URL, ORDER_DELETE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL, ORDER_UPDATE_URL } from '../shared/constants/urls';
import { Order } from '../shared/models/Order';
import { Observable } from 'rxjs';
import { ServerResponse } from '../shared/interfaces/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  pay(order:Order):Observable<string>{
    return this.http.post<string>(ORDER_PAY_URL,order);
  }

  trackOrderById(id:number): Observable<Order>{
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }

  getAllOrders(): Observable<ServerResponse>{
    return this.http.get<ServerResponse>(ORDERS_URL);
  }

  updateOrder(order: Order, orderId: string){
    return this.http.put<Order>(ORDER_UPDATE_URL + orderId, order);
  }

  deleteOrder(orderId: string){
    return this.http.delete<Order>(ORDER_DELETE_URL + orderId);
  }

}
