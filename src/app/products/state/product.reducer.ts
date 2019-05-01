import {ProductActions, ProductActionTypes} from './product.action';
import {Product} from '../product';
import * as fromRoot from '../../state/app.state';


export interface ProductState {
    readonly showProductCode: boolean;
    readonly currentProductId: number | undefined;
    readonly products: ReadonlyArray<Product>;
    readonly error: string | undefined;
}

export interface State extends fromRoot.State {
    readonly products: ProductState
}

const initialState: ProductState = {
    showProductCode: false,
    currentProductId: undefined,
    products: [],
    error: undefined
};

implement create/delete

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
                currentProductId: action.payload.id
            };

        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: undefined
            };

        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0
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

        case ProductActionTypes.UpdateProductSuccess:
            const updatedProducts = state.products.map(
                item => action.payload.id === item.id ? action.payload : item
            );
            return {
                ...state,
                products: updatedProducts,
                currentProductId: action.payload.id,
                error: undefined
            };

        case ProductActionTypes.UpdateProductFail:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}



































