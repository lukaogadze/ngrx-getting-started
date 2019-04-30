import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {Product} from '../product';
import {ProductState} from './product.reducer';

const getProductFeatureState: MemoizedSelector<object, ProductState> = createFeatureSelector<ProductState>('products');




export const getShowProductCodeSelector: MemoizedSelector<object, boolean> = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductSelector: MemoizedSelector<object, Product | undefined> = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

export const getProductsSelector: MemoizedSelector<object, ReadonlyArray<Product>> = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getErrorSelector: MemoizedSelector<object, string | undefined> = createSelector(
    getProductFeatureState,
    state => state.error
);
