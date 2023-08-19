import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { Tag } from '../shared/models/Tag';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CREATE_PRODUCT_URL, FAVOURITES_URL, PRODUCTS_BY_ID_URL, PRODUCTS_BY_SEARCH_URL, PRODUCTS_BY_TAG_URL, PRODUCTS_TAGS_URL, PRODUCTS_URL, TOGGLE_FAVOURITE_URL, UPDATE_PRODUCT_STARS_URL } from '../shared/constants/urls';
import { Favourite } from '../shared/interfaces/Favourite';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private favoriteProductsSubject: BehaviorSubject<Favourite[]> = new BehaviorSubject<Favourite[]>([]);
  favouritesSubject: Subject<Favourite> = new Subject<Favourite>();
   // Define the updateStars subject to emit the updateStars event
   updateStars: Subject<{ stars: number, productId: string }> = new Subject<{ stars: number, productId: string }>();
  
   constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  getAllProductsBySearchTerm(searchTerm: string) {
    return this.http.get<Product[]>(PRODUCTS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(PRODUCTS_TAGS_URL);
  }

  getAllProductsByTag(tag: string): Observable<Product[]> {
    return tag === "All" ?
      this.getAll() :
      this.http.get<Product[]>(PRODUCTS_BY_TAG_URL + tag);
  }

  getProductById(ProductId:string):Observable<Product>{
    return this.http.get<Product>(PRODUCTS_BY_ID_URL + ProductId);
  }

  toggleFavorite(productId: string, userId: string): Observable<Favourite> {
    const body = { userId, productId };
    return this.http.post<Favourite>(TOGGLE_FAVOURITE_URL, body).pipe(
      tap(  {
        next: (response) => {
          this.favouritesSubject.next(response);
        }
      })
    );
  }

  getFavoriteProducts(userId: string): Observable<Favourite[]> {
    return this.http.get<Favourite[]>(FAVOURITES_URL).pipe(
      tap((favoriteProducts) => {
        this.favoriteProductsSubject.next(favoriteProducts);
      })
    );
  }
  
  updateProductStars(stars: number, productId: string): Observable<Product> {
    const body = { stars, productId };
    return this.http.post<Product>(UPDATE_PRODUCT_STARS_URL, body);
  }

  postProduct(product: Product) {
    return this.http.post<Product>(CREATE_PRODUCT_URL, product);
  }

  updateProduct(){}

}
