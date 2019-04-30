import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProductService} from '../product.service';
import {LoadAction, LoadSuccessAction, ProductActionTypes} from './product.action';
import {map, mergeMap} from 'rxjs/operators';
import {Product} from '../product';

@Injectable()
export class ProductEffects {
    constructor(private readonly _actions$: Actions,
                private readonly _productService: ProductService) {
    }

    @Effect()
    readonly loadProducts$ = this._actions$.pipe(
        ofType(ProductActionTypes.Load),
        mergeMap((_: LoadAction) => this._productService.getProducts().pipe(
            map((products: Product[]) => (new LoadSuccessAction(products)))
        ))
    );
}
