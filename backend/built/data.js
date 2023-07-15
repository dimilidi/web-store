"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample_users = exports.sample_tags = exports.sample_products = void 0;
exports.sample_products = [
    {
        id: '1',
        name: 'Flower',
        price: 25,
        favorite: false,
        origins: ['italy'],
        stars: 4.5,
        imageUrl: 'assets/flower.jpg',
        tags: ['Flowers'],
    },
    {
        id: '2',
        name: 'Watch',
        price: 120,
        favorite: true,
        origins: ['persia', 'middle east', 'china'],
        stars: 4.7,
        imageUrl: 'assets/watch.jpg',
        tags: ['Jewelry', 'Electronics'],
    },
    {
        id: '3',
        name: 'Shoes',
        price: 150,
        favorite: false,
        origins: ['germany', 'us'],
        stars: 3.5,
        imageUrl: 'assets/shoes2.jpg',
        tags: ['Shoes'],
    },
    {
        id: '4',
        name: 'Camera',
        price: 200,
        favorite: true,
        origins: ['belgium', 'france'],
        stars: 3.3,
        imageUrl: 'assets/camera.jpg',
        tags: ['Electronics'],
    },
    {
        id: '5',
        name: 'Headset',
        price: 11,
        favorite: false,
        origins: ['india', 'asia'],
        stars: 3.0,
        imageUrl: 'assets/headset.jpg',
        tags: ['Electronics'],
    },
    {
        id: '6',
        name: 'Training Shoes',
        price: 9,
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: 'assets/shoes3.jpg',
        tags: ['Shoes'],
    },
];
exports.sample_tags = [
    { name: 'All', count: 6 },
    { name: 'Electronics', count: 3 },
    { name: 'Shoes', count: 2 },
    { name: 'Flowers', count: 1 }
];
exports.sample_users = [
    {
        name: "John Doe",
        email: "john@gmail.com",
        password: "12345",
        address: "Toronto On",
        isAdmin: true,
    },
    {
        name: "Jane Doe",
        email: "jane@gmail.com",
        password: "12345",
        address: "Shanghai",
        isAdmin: false,
    },
];
