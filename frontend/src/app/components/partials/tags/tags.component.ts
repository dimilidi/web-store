import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  tags?: Tag[];

  @Output() showCategory = new EventEmitter<Tag>();
  
  constructor(productService: ProductService){
    productService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
  }


  onShowCategory(tag: Tag) :void {
    this.showCategory.emit(tag);
  }

}
