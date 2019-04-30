import {Component, OnInit, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {select, Store} from '@ngrx/store';

import * as fromProduct from '../state/product.reducer';

import {ToggleProductCodeAction} from '../state/product.action';
import {ProductState} from '../state/product.reducer';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    readonly pageTitle: string;
    errorMessage: string | undefined;

    displayCode: boolean | undefined;

    products: Product[];


    selectedProduct: Product | undefined;
    selectedProductChangesSubscription: Subscription | undefined;

    constructor(private readonly _productService: ProductService,
                private readonly _store: Store<fromProduct.State>) {
        this.products = [];
        this.pageTitle = 'Products';
    }

    ngOnInit(): void {
        this.selectedProductChangesSubscription = this._productService.selectedProductChanges$.subscribe(
            (selectedProduct: Product | undefined) => this.selectedProduct = selectedProduct
        );

        this._productService.getProducts().subscribe(
            (products: Product[]) => this.products = products,
            (err: any) => this.errorMessage = err.error
        );

        //TODO
        // - Refactor
        // - Unsubscribe
        this._store.pipe(select('products')).subscribe((products: ProductState) => {
            this.displayCode = products.showProductCode;
        });
    }

    ngOnDestroy(): void {
        this.selectedProductChangesSubscription!.unsubscribe();
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
