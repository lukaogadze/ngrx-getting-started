import {ProductActions, ProductActionTypes} from './product.action';
import {Product} from '../product';
import * as fromRoot from  "../../state/app.state";


export interface ProductState {
    readonly showProductCode: boolean;
    readonly currentProduct: Product | undefined;
    readonly products: ReadonlyArray<Product>
}

export interface State extends fromRoot.State {
    readonly products: ProductState
}



const initialState: ProductState = {
    showProductCode: false,
    currentProduct: undefined,
    products: [],
};

export function reducer(state = initialState, action: ProductActions): ProductState {
    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload
            };
        default:
            return state;
    }
}


