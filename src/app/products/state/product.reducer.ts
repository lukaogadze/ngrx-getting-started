import {ProductActions, ProductActionTypes} from './product.action';
import {Product} from '../product';
import * as fromRoot from '../../state/app.state';


export interface ProductState {
    readonly showProductCode: boolean;
    readonly currentProduct: Product | undefined;
    readonly products: ReadonlyArray<Product>;
    readonly error: string | undefined;
}

export interface State extends fromRoot.State {
    readonly products: ProductState
}

const initialState: ProductState = {
    showProductCode: false,
    currentProduct: undefined,
    products: [],
    error: undefined
};


export function reducer(state: ProductState = initialState, action: ProductActions): ProductState {
    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload
            };

        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProduct: {...action.payload}
            };

        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProduct: undefined
            };

        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProduct: {
                    id: 0,
                    productName: "",
                    productCode: "New",
                    description: "",
                    starRating: 0
                }
            };

        case ProductActionTypes.LoadSuccess:
            return {
                ...state,
                error: undefined,
                products: action.payload,
            };

        case ProductActionTypes.LoadFail:
            return {
                ...state,
                products: [],
                error: action.payload
            };

        default:
            return state;
    }
}



































