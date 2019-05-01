import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {Product} from '../product';
import {ProductState} from './product.reducer';

const getProductFeatureState: MemoizedSelector<object, ProductState> = createFeatureSelector<ProductState>('products');


export const getShowProductCodeSelector: MemoizedSelector<object, boolean> = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductIdSelector: MemoizedSelector<object, number | undefined> = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProductSelector: MemoizedSelector<object, Product | undefined> = createSelector(
    getProductFeatureState,
    getCurrentProductIdSelector,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currentProductId ? state.products.find(x => x.id === currentProductId) : undefined;
        }
    }
);

export const getProductsSelector: MemoizedSelector<object, ReadonlyArray<Product>> = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getErrorSelector: MemoizedSelector<object, string | undefined> = createSelector(
    getProductFeatureState,
    state => state.error
);
