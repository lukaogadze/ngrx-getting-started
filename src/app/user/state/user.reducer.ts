import {UserActions, UserActionTypes} from './user.action';

export interface UserState {
    readonly maskUserName: boolean;
}

const initialState: UserState = {
    maskUserName: false
};

export function reducer(state = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.MaskUserName:
            return {
                ...state,
                maskUserName: action.payload
            };

        default:
            return state;
    }
}
