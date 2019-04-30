import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {Product} from '../product';
import {ProductState} from './product.reducer';

const getProductFeatureState: MemoizedSelector<object, ProductState> = createFeatureSelector<ProductState>('products');




export const getShowProductCode: MemoizedSelector<object, boolean> = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProduct: MemoizedSelector<object, Product | undefined> = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

export const getProducts: MemoizedSelector<object, ReadonlyArray<Product>> = createSelector(
    getProductFeatureState,
    state => state.products
);