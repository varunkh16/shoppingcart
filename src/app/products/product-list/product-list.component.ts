import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  /*products = [
    {name:"Hajmola", description:"Dabur Hajmola"},
    {name:"Chocolate", description:"Dairy Milk"},
    {name:"Chips", description:"Lays Potato Chips"},
  ];*/

  products: Product[] = [];
  private postsSub: Subscription;
  private loginSub: Subscription;
  isLogin = false;

  constructor(public productService: ProductService, public authService: AuthService) { }

  ngOnInit() {
    this.productService.getProducts();
    this.isLogin = this.authService.getIsAuth();
    this.loginSub = this.authService.getAuthStatusListener().subscribe(isLogin=>{
       this.isLogin = isLogin;
     });
    this.postsSub = this.productService.getProductUpdateListener()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  onDelete(id:string) {
    this.productService.deleteProduct(id);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.loginSub.unsubscribe();
  }

}
