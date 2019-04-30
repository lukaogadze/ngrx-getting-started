import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {UserState} from './user.reducer';

const getUserFeatureState: MemoizedSelector<object, UserState> = createFeatureSelector<UserState>("users");


export const getMaskUserName: MemoizedSelector<object, boolean> = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);
