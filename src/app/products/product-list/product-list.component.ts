import {Component, OnInit} from '@angular/core';

import {Product} from '../product';
import {select, Store} from '@ngrx/store';

import * as fromProductReducer from '../state/product.reducer';

import {InitializeCurrentProductAction, LoadAction, SetCurrentProductAction, ToggleProductCodeAction} from '../state/product.action';
import {getCurrentProductSelector, getErrorSelector, getProductsSelector, getShowProductCodeSelector} from '../state/product.selector';
import {Observable} from 'rxjs';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    readonly pageTitle: string;
    products$!: Observable<ReadonlyArray<Product>>;
    errorMessage$!: Observable<string | undefined>;
    displayCode$!: Observable<boolean>;
    selectedProduct$!: Observable<Product | undefined>;

    constructor(private readonly _store: Store<fromProductReducer.State>) {
        this.pageTitle = 'Products';
    }

    ngOnInit(): void {
        this.selectedProduct$ = this._store.pipe(select(getCurrentProductSelector));
        this.errorMessage$ = this._store.pipe(select(getErrorSelector));
        this._store.dispatch(new LoadAction());
        this.products$ = this._store.pipe(select(getProductsSelector));
        this.displayCode$ = this._store.pipe(select(getShowProductCodeSelector));
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
