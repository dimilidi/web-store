import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent {
  @Input() stars!: number;
  @Input() averageRating!: number;
  @Input() size: number = 1;
  @Input() productId!: string; 

  @Output() starClicked: EventEmitter<{ stars: number, productId: string }> = new EventEmitter();


  get styles() {
    return {
      'width.rem': this.size,
      'height.rem': this.size,
      'marginRight.rem': this.size / 6,
    };
  }

  // Check if the star at the given index should be filled for user rating in "rate" mode
  isStarFilledForRateMode(index: number): boolean {
    return index + 1 <= Math.round(this.stars);
  }

  // Check if the star at the given index should be filled for average rating in "view" mode
  isStarFilledForViewMode(index: number): boolean {
    return index + 1 <= Math.round(this.averageRating);
  }

  getStarImage(current: number): string {
    const imageName =
      this.isStarFilledForRateMode(current - 1) || this.isStarFilledForViewMode(current - 1)
        ? 'star-full'
        : 'star-empty';
    return `/assets/stars/${imageName}.svg`;
  }

  onStarClick(starValue: number) {
    // Emit both stars and productId when a star is clicked
    this.starClicked.emit({ stars: starValue, productId: this.productId });
  }
}
