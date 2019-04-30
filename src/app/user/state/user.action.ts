import {Action} from '@ngrx/store';

export const enum UserActionTypes {
    MaskUserName = '[Users] Mask User Name'
}


export class MaskUserNameAction implements Action {
    readonly type = UserActionTypes.MaskUserName;
    constructor(public readonly payload: boolean) {
    }
}

export type UserActions = MaskUserNameAction;
