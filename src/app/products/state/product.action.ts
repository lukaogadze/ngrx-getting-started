import {Action} from '@ngrx/store';

export const enum ProductActionTypes {
    ToggleProductCode = "[Product] Toggle Product Code"
}


export class ToggleProductCodeAction implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;
    constructor(public readonly payload: boolean) {}
}





export type ProductActions = ToggleProductCodeAction;
