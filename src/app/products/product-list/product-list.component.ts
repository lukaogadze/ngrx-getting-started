import {Component, OnInit} from '@angular/core';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {select, Store} from '@ngrx/store';

import * as fromProductReducer from '../state/product.reducer';

import {InitializeCurrentProductAction, SetCurrentProductAction, ToggleProductCodeAction} from '../state/product.action';
import {getCurrentProductSelector, getShowProductCodeSelector} from '../state/product.selector';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    readonly pageTitle: string;
    products: Product[];
    errorMessage: string | undefined;
    displayCode: boolean | undefined;
    selectedProduct: Product | undefined;

    constructor(private readonly _productService: ProductService,
                private readonly _store: Store<fromProductReducer.State>) {
        this.products = [];
        this.pageTitle = 'Products';
    }

    ngOnInit(): void {
        // TODO Refactor
        this._store.pipe(select(getCurrentProductSelector)).subscribe(
            currentProduct => this.selectedProduct = currentProduct
        );

        this._productService.getProducts().subscribe(
            (products: Product[]) => this.products = products,
            (err: any) => this.errorMessage = err.error
        );


        // TODO Refactor
        this._store.pipe(select(getShowProductCodeSelector)).subscribe(showProductCode => {
            this.displayCode = showProductCode;
        });
    }

    checkChanged(value: boolean): void {
        this._store.dispatch(new ToggleProductCodeAction(value));
    }

    newProduct(): void {
        this._store.dispatch(new InitializeCurrentProductAction());
    }

    productSelected(product: Product): void {
        this._store.dispatch(new SetCurrentProductAction(product));
    }

}
