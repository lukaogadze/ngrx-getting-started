import {Action} from '@ngrx/store';
import {Product} from '../product';

export const enum ProductActionTypes {
    /**
     * [Product] Toggle Product Code
     */
    ToggleProductCode = "[Product] Toggle Product Code",

    /**
     * [Product] Set Current Product
     */
    SetCurrentProduct = "[Product] Set Current Product",

    /**
     * [Product] Clear Current Product
     */
    ClearCurrentProduct = "[Product] Clear Current Product",

    /**
     * [Product] Initialize Current Product
     */
    InitializeCurrentProduct = "[Product] Initialize Current Product",

    /**
     * [Product] Load
     */
    Load = "[Product] Load",

    /**
     * [Product API] Load Success
     */
    LoadSuccess = "[Product API] Load Success",

    /**
     * [Product API] Load Fail
     */
    LoadFail = "[Product API] Load Fail",

    /**
     * [Product] Update Product
     */
    UpdateProduct = "[Product] Update Product",

    /**
     * [Product] Update Product Success
     */
    UpdateProductSuccess = "[Product] Update Product Success",

    /**
     * [Product] Update Product Fail
     */
    UpdateProductFail = "[Product] Update Product Fail"
}


export class ToggleProductCodeAction implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;
    constructor(public readonly payload: boolean) {}
}

export class SetCurrentProductAction implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;
    constructor(public readonly payload: Product) {}
}

export class ClearCurrentProductAction implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProductAction implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export class LoadAction implements Action {
    readonly type = ProductActionTypes.Load;
}

export class LoadSuccessAction implements Action {
    readonly type = ProductActionTypes.LoadSuccess;
    constructor(public readonly payload: ReadonlyArray<Product>) {}
}

export class LoadFailAction implements Action {
    readonly type = ProductActionTypes.LoadFail;
    constructor(public readonly payload: string) {}
}

export class UpdateProductAction implements Action {
    readonly type = ProductActionTypes.UpdateProduct;
    constructor(public readonly payload: Product) {}
}

export class UpdateProductSuccessAction implements Action {
    readonly type = ProductActionTypes.UpdateProductSuccess;
    constructor(public readonly payload: Product) {}
}

export class UpdateProductFailAction implements Action {
    readonly type = ProductActionTypes.UpdateProductFail;
    constructor(public readonly payload: string) {}
}


export type ProductActions = ToggleProductCodeAction
    | SetCurrentProductAction
    | ClearCurrentProductAction
    | InitializeCurrentProductAction
    | LoadAction
    | LoadSuccessAction
    | LoadFailAction
    | UpdateProductAction
    | UpdateProductSuccessAction
    | UpdateProductFailAction;
