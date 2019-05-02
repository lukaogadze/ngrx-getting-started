import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProductService} from '../product.service';
import {
    CreateProductAction,
    CreateProductFailAction,
    CreateProductSuccessAction,
    DeleteProductAction,
    DeleteProductFailAction,
    DeleteProductSuccessAction,
    LoadAction,
    LoadFailAction,
    LoadSuccessAction,
    ProductActionTypes,
    UpdateProductAction,
    UpdateProductFailAction,
    UpdateProductSuccessAction
} from './product.action';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Product} from '../product';
import {of} from 'rxjs';

@Injectable()
export class ProductEffects {
    constructor(private readonly _actions$: Actions,
                private readonly _productService: ProductService) {
    }

    @Effect()
    readonly loadProducts$ = this._actions$.pipe(
        ofType(ProductActionTypes.Load),
        mergeMap((_: LoadAction) => this._productService.getProducts().pipe(
            map((products: Product[]) => (new LoadSuccessAction(products))),
            catchError(err => of(new LoadFailAction(err)))
        ))
    );

    @Effect()
    readonly updateProduct$ = this._actions$.pipe(
        ofType(ProductActionTypes.UpdateProduct),
        map((updateProductAction: UpdateProductAction) => updateProductAction.payload),
        mergeMap((product: Product) =>
            this._productService.updateProduct(product).pipe(
                map(updatedProduct => (new UpdateProductSuccessAction(updatedProduct))),
                catchError(err => of(new UpdateProductFailAction(err)))
            )
        )
    );

    @Effect()
    readonly createProduct$ = this._actions$.pipe(
        ofType(ProductActionTypes.CreateProduct),
        map((action: CreateProductAction) => action.payload),
        mergeMap((product: Product) =>
            this._productService.createProduct(product).pipe(
                map(newProduct => (new CreateProductSuccessAction(newProduct))),
                catchError(err => of(new CreateProductFailAction(err)))
            )
        )
    );

    @Effect()
    readonly deleteProduct$ = this._actions$.pipe(
        ofType(ProductActionTypes.DeleteProduct),
        map((action: DeleteProductAction) => action.payload),
        mergeMap((productId: number) =>
            this._productService.deleteProduct(productId).pipe(
                map(() => (new DeleteProductSuccessAction(productId))),
                catchError(err => of(new DeleteProductFailAction(err)))
            )
        )
    );
}



















