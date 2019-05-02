import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {Product} from '../../product';
import {select, Store} from '@ngrx/store';

import * as fromProductReducer from '../../state/product.reducer';

import {
    ClearCurrentProductAction, CreateProductAction,
    DeleteProductAction,
    InitializeCurrentProductAction,
    LoadAction,
    SetCurrentProductAction,
    ToggleProductCodeAction, UpdateProductAction
} from '../../state/product.action';
import {getCurrentProductSelector, getErrorSelector, getProductsSelector, getShowProductCodeSelector} from '../../state/product.selector';
import {Observable} from 'rxjs';

@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
    products$!: Observable<ReadonlyArray<Product>>;
    errorMessage$!: Observable<string | undefined>;
    displayCode$!: Observable<boolean>;
    selectedProduct$!: Observable<Product | undefined>;

    constructor(private readonly _store: Store<fromProductReducer.State>) {
    }

    ngOnInit(): void {
        this._store.dispatch(new LoadAction());
        this.selectedProduct$ = this._store.pipe(select(getCurrentProductSelector));
        this.errorMessage$ = this._store.pipe(select(getErrorSelector));
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

    deleteProduct(product: Product): void {
        this._store.dispatch(new DeleteProductAction(product.id as any));
    }

    clearProduct(): void {
        this._store.dispatch(new ClearCurrentProductAction());
    }
    saveProduct(product: Product): void {
        this._store.dispatch(new CreateProductAction(product));
    }

    updateProduct(product: Product): void {
        this._store.dispatch(new UpdateProductAction(product));
    }
}
