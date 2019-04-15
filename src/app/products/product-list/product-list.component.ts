import {Component, OnInit, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {select, Store} from '@ngrx/store';
import {ProductState} from '../state/product.reducer';
import {ToggleProductCodeAction} from '../state/product.action';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle = 'Products';
    errorMessage!: string;

    displayCode!: boolean;

    products: Product[];

    // Used to highlight the selected product in the list
    selectedProduct: Product | undefined;
    sub!: Subscription;

    constructor(private readonly _productService: ProductService,
                private readonly _store: Store<ProductState>) {
        this.products = [];
    }

    ngOnInit(): void {
        this.sub = this._productService.selectedProductChanges$.subscribe(
            (selectedProduct: Product | undefined) => this.selectedProduct = selectedProduct
        );

        this._productService.getProducts().subscribe(
            (products: Product[]) => this.products = products,
            (err: any) => this.errorMessage = err.error
        );

        // TODO: Unsubscribe
        this._store.pipe(select("products")).subscribe(
            (productsState: ProductState) => {
                if (productsState) {
                    this.displayCode = productsState.showProductCode
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    checkChanged(value: boolean): void {
        this._store.dispatch(new ToggleProductCodeAction(value));
    }

    newProduct(): void {
        this._productService.changeSelectedProduct(this._productService.newProduct());
    }

    productSelected(product: Product): void {
        this._productService.changeSelectedProduct(product);
    }

}
