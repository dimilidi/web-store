export class Product {
    id!: string;
    name!: string;
    price!: number;
    tags?: string[];
    favorite!: boolean;
    stars!: number;
    numRatings!: number;
    averageRating!: number;
    imageUrl!: string;
    origins!: string[];
}