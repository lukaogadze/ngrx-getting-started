import {UserState} from '../user/state/user.reducer';

export interface State {
    readonly users: UserState;
}
