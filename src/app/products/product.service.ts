import { Injectable } from '@angular/core';

import { Product } from './product.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class ProductService {
    private products: Product[] = [];
    private productsUpdated = new Subject<Product[]>();

    constructor(private http: HttpClient, private router: Router) {}

    addProduct(title: string, content: string) {
        const product: Product = {id:null,title:title,content:content};
        // const productData = new FormData();
        // productData.append('title',title);
        // productData.append('content',content);
        this.http
        .post<{ message: string; product: Product }>(
            "http://localhost:3000/api/products",
            product
        )
        .subscribe(responseData => {
            this.router.navigate(["/"]);
        });
    }

    /*getProducts() {
        this.http
        .get<{message: string; products: Product[]}>(
            "http://localhost:3000/api/products"
        )
        .subscribe(responseData => {
            this.products = responseData.products;
            this.productsUpdated.next({
                products: [...this.products],
                productCount: responseData.maxPosts
              });
        });
    }*/

    getProducts() {
        this.http
          .get<{ message: string; products: any }>(
            "http://localhost:3000/api/products"
          )
          .pipe(map((productsData) => {
            return productsData.products.map(product => {
              return {
                title: product.title,
                content: product.content,
                id: product._id
              };
            });
          }))
          .subscribe(responseData => {
            this.products = responseData;
            this.productsUpdated.next([...this.products]);
          });
      }

      getProduct(id: string) {
        return this.http.get<{_id:string,title:string,content:string}>("http://localhost:3000/api/products/"+id);
      }

      getProductUpdateListener() {
        return this.productsUpdated.asObservable();
      }

      deleteProduct(id:string) {
          this.http
          .delete(
              "http://localhost:3000/api/products/"+id
          )
          .subscribe(response=>{
              const updatedProducts = this.products.filter(product=>product.id!=id);
              this.products = updatedProducts;
              this.productsUpdated.next([...this.products]);
          })
      }

      updateProduct(id: string, title: string, content: string) {
        const product: Product = {id:id,title:title,content:content};
        // const productData = new FormData();
        // productData.append('title',title);
        // productData.append('content',content);
        this.http
        .put<{ message: string; product: Product }>(
            "http://localhost:3000/api/products/"+id,
            product
        )
        .subscribe(responseData => {
            this.router.navigate(["/"]);
        });
    }

}