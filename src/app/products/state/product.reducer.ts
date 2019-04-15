import {ProductActionTypes} from './product.action';


export interface ProductState {
    readonly showProductCode: boolean;
}

const initialState: ProductState = {
    showProductCode: false
};

export function productReducer(state = initialState, action: any): ProductState {
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
