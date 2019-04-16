import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from './auth.service';
import {select, Store} from '@ngrx/store';
import {UserState} from './state/user.reducer';
import {MaskUserNameAction} from './state/user.action';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    readonly pageTitle = 'Log In';
    errorMessage: string;

    maskUserName: boolean | undefined;

    constructor(private readonly _authService: AuthService,
                private readonly _router: Router,
                private readonly _store: Store<UserState>) {
        this.errorMessage = '';
    }

    ngOnInit(): void {
        this._store.pipe(select("users")).subscribe(
            (userState: UserState) => {
                this.maskUserName = userState.maskUserName;
            }
        );
    }

    cancel(): void {
        this._router.navigate(['welcome']);
    }

    checkChanged(value: boolean): void {
        this._store.dispatch(new MaskUserNameAction(value));
    }

    login(loginForm: NgForm): void {
        if (loginForm && loginForm.valid) {
            const userName = loginForm.form.value.userName;
            const password = loginForm.form.value.password;
            this._authService.login(userName, password);

            if (this._authService.redirectUrl) {
                this._router.navigateByUrl(this._authService.redirectUrl);
            } else {
                this._router.navigate(['/products']);
            }
        } else {
            this.errorMessage = 'Please enter a user name and password.';
        }
    }
}
