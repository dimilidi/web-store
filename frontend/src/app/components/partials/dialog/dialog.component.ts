import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Tag } from 'src/app/shared/models/Tag';
import { User } from 'src/app/shared/models/User';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  tags?: Tag[];
  productForm!: FormGroup;
  fileName = 'Select File';
  file: any;
  fileContent: string = '';
  actionButton: string = 'Save';

 

  @Output() showCategory = new EventEmitter<Tag>();
  @ViewChild('UploadFileInput') uploadFileInput!: ElementRef;
  @ViewChild(MatDialogRef) dialog!: MatDialogRef<DialogComponent>;


  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any
  ) {
    productService.getAllTags().subscribe((serverTags) => {
      this.tags = serverTags;
    });
  }

  ngOnInit(): void {
    const imageFormControl = new FormControl(this.fileContent);
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      tags: ['', Validators.required],
      origins: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
      imageUrl: imageFormControl,
      //description: ['', Validators.required],
     // date: ['', Validators.required],
    });

    if(this.editData){
      this.actionButton = 'Update';
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['tags'].setValue(this.editData.tags[0]);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['origins'].setValue(this.editData.origins);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['imageUrl'].setValue(this.editData.imageUrl);
    
    }
    
  }

  onShowCategory(tag: Tag): void {
    this.showCategory.emit(tag);
  }

  addProduct() {
    if(!this.editData){
      if (this.productForm.invalid) return;
   
    const productData = {
      ...this.productForm.value,
      imageUrl: this.fileContent // Include the base64-encoded image data
    };
    
    this.productService.postProduct(productData).subscribe({
      next: (res) => {
        this.toastrService.success(
          `Product Added!`,
          'Product added Successfully'
        );
        this.productForm.reset();
        this.router.navigateByUrl('/dashboard');
        this.dialogRef.close('save');

      },
      error: (error) => {
        console.log(error);
        this.toastrService.error(
          `Error! ${this.productForm.value}`,
          'Error while adding the product!'
        );
      },
    });
    } else {
      this.updateProduct();
    }
  }


  updateProduct() {
    
  }


  handleFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.file = files[0];

      // Set the filename for display (optional)
      this.fileName = this.file.name;

      // Handle file reading (optional)
      this.readFile();
    }
  }

  readFile() {
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onloadend = () => {
      // Get the file content (base64 encoded)
      this.fileContent = reader.result as string;

      console.log('File content (base64):', this.fileContent);
    };
    
  }


}
