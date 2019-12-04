import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from '../product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  product: Product;
  private mode = "create";
  private productId: string;

  constructor(private productService: ProductService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has("productId")) {
        this.mode = "edit";
        this.productId = paramMap.get("productId");
        this.productService.getProduct(this.productId).subscribe(productData=>{
          this.product={id:productData._id,title:productData.title,content:productData.content};
          this.form.setValue({
            title: this.product.title,
            content: this.product.content
          });
        });
      } else {
        this.mode = "create";
        this.productId = null;
      }
    });
  }

  onSaveProduct() {
    if (this.form.invalid) {
      return;
    }

    if(this.mode == "create") {
      this.productService.addProduct(this.form.value.title,this.form.value.content);
    } else {
      this.productService.updateProduct(this.productId, this.form.value.title,this.form.value.content);
    }
    this.form.reset();
  }

}
