import {Action} from '@ngrx/store';

export const enum ProductActionTypes {
    ToggleProductCode = "Toggle Product Code"
}


export class ToggleProductCodeAction implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;
    constructor(public readonly payload: boolean) {}
}
