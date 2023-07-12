import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { sample_products, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getAll(): Product[] {
    return sample_products;
  }

  getAllProductsBySearchTerm(searchTerm: string) {
    return this.getAll().filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getProductById(productId: string): Product {
    return (
      this.getAll().find((product) => product.id == productId) ?? new Product()
    ); //  '??' = nullish coalescing operator; if the result of find is undefined, it will return a new instance of the Product class
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllProductsByTags(tag: string): Product[] {
    return tag == 'All'
      ? this.getAll()
      : this.getAll().filter((product) => product.tags?.includes(tag));
  }
}
