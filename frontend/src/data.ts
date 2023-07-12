import {Product} from './app/shared/models/Product';
import { Tag } from './app/shared/models/Tag';

export const sample_products: Product[] = [
  {
    id:'1',
    name: 'Flower',
    price: 25,
    favorite: false,
    origins: ['italy'],
    stars: 4.5,
    imageUrl: 'assets/flower.jpg',
    tags: ['Flowers', 'Pot', 'Garden'],
  },
  {
    id:'2',
    name: 'Watch',
    price: 120,
    favorite: true,
    origins: ['persia', 'middle east', 'china'],
    stars: 4.7,
    imageUrl: 'assets/watch.jpg',
    tags: ['Jewelry', 'Watch'],
  },
  {
    id:'3',
    name: 'Shoes',
    price: 150,
    favorite: false,
    origins: ['germany', 'us'],
    stars: 3.5,
    imageUrl: 'assets/shoes2.jpg',
    tags: ['Shoes', 'Nike'],
  },
  {
    id:'4',
    name: 'Camera',
    price: 200,
    favorite: true,
    origins: ['belgium', 'france'],
    stars: 3.3,
    imageUrl: 'assets/camera.jpg',
    tags: ['Electronics', 'Photo'],
  },
  {
    id:'5',
    name: 'Headset',
    price: 11,
    favorite: false,
    origins: ['india', 'asia'],
    stars: 3.0,
    imageUrl: 'assets/headset.jpg',
    tags: ['Electronics', 'Music'],
  },
  {
    id:'6',
    name: 'Training Shoes',
    price: 9,
    favorite: false,
    origins: ['italy'],
    stars: 4.0,
    imageUrl: 'assets/shoes3.jpg',
    tags: ['Shoes', 'Puma'],
  },
]


export const sample_tags:Tag[] = [
  { name: 'All', count: 6 },
  { name: 'Electronics', count: 2 },
  { name: 'Shoes', count: 2 },
  { name: 'Flowers', count: 1 },
  { name: 'Puma', count: 1 },
  { name: 'Nike', count: 1 },
  { name: 'Music', count: 1 },
  { name: 'Photo', count: 1 },
]
